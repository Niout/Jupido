from django.conf import settings
import jwt
import requests
import json

class TokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def refresh_token(self, refresh):
        url = 'http://127.0.0.1:8000/refresh/'
        data = {"refresh": refresh}
        resp = requests.post(
            url, 
            data=json.dumps(data),
            headers = {'content-type': 'application/json'}
            )
        result = resp.json()
        if 'access' not in result:
            return None
        if result['access'] == '':
            return None
        return result['access']

    def __call__(self, request):
        access_token = request.COOKIES.get('access_token')
        refesh_token = request.COOKIES.get('refresh_token')

        if access_token is None:
            if refesh_token is None or refesh_token == '':
                return self.get_response(request)
            new_tok = self.refresh_token(refesh_token)
            if new_tok is None or new_tok == '':
                return self.get_response(request)
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_tok}'
            res = self.get_response(request)
            res.set_cookie('access_token', new_tok, httponly=True, samesite='Lax', secure=True)
            return res
        
        key = settings.SECRET_KEY
        try:
            jwt.decode(access_token, key, algorithms=["HS256"])
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
            res = self.get_response(request)
            if res.status_code == 401:
                res.delete_cookie('access_token')
            return res
        except jwt.ExpiredSignatureError:
            if refesh_token is None or refesh_token == '':
                res = self.get_response(request)
                res.delete_cookie('access_token')
            else:
                new_tok = self.refresh_token(refesh_token)
                if new_tok is None or new_tok == '':
                    res = self.get_response(request)
                    res.delete_cookie('access_token')
                    res.delete_cookie('refresh_token')
                    return res                    
                request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_tok}'
                res = self.get_response(request)

                if res.status_code == 401:
                    res.delete_cookie('access_token')
                    res.delete_cookie('refresh_token')
                    return res

                res.set_cookie('access_token', new_tok, httponly=True, samesite='Lax', secure=True)
            return res
        except jwt.InvalidTokenError:
            res = self.get_response(request)
            res.delete_cookie('access_token')
            res.delete_cookie('refresh_token')
            return res
        except:
            res = self.get_response(request)
            res.delete_cookie('access_token')
            res.delete_cookie('refresh_token')
            return res