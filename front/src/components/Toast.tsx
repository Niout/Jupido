import { toast } from "react-toastify";
import { FaAngry, FaSmileWink, FaSurprise } from "react-icons/fa";

export class Toast {
  static success(message: string) {
    toast.success(message, {
      icon: <FaSmileWink className="text-[#07bc0c] text-2xl" />,
      position: window.innerWidth < 768 ? "top-right" : "bottom-right",
    });
  }
  static error(message: string) {
    toast.error(message, {
      icon: <FaAngry className="text-[#e74c3c] text-2xl" />,
      position: window.innerWidth < 768 ? "top-right" : "bottom-right",
    });
  }
  static info(message: string) {
    toast.info(message, {
      icon: (
        <svg
          className="fill-[#3498db] text-2xl"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 239.49 239.75"
        >
          <path d="M67.38,142.28c6,0,12,.06,17.99-.01,16.06-.18,26.15-9.7,27.04-25.87,.4-7.31,.27-14.66,.07-21.99-.09-3.45,.98-4.55,4.51-4.53,10.09,.06,9.99-.09,10.13,9.79,.09,6.98-.64,13.99,.6,20.94,2.25,12.67,11.12,21.1,23.85,21.5,13.81,.44,27.66,.44,41.47-.02,13.25-.44,22.88-9.69,24.02-22.91,.71-8.27,.47-16.64,.44-24.96-.01-3.1,.73-4.73,4.18-4.3,1.8,.23,3.66,.04,5.49,.04q9.29,0,10.77,9.47c9.66,61.73-27.01,119.73-85.96,135.94C82.21,254.56,11.9,208.7,1.28,136.99c-2.11-14.28-1.6-28.52,1.4-42.72,.76-3.62,2.21-4.67,5.64-4.36,2.97,.27,6.03,.34,8.98-.01,4.2-.51,4.86,1.41,4.88,5.09,.03,8.48-.86,17.01,.55,25.44,2.2,13.15,11.35,21.29,24.66,21.79,6.65,.25,13.33,.04,19.99,.04v.02Zm52.45,52.7c20.34-.14,37.49-7.8,51.86-22.01,1.18-1.17,2.35-2.4,3.22-3.8,2.2-3.56,1.98-7.15-1.18-9.95-3.14-2.78-6.67-2.67-9.94,.08-1.02,.85-1.9,1.86-2.84,2.81-16.73,16.86-36.62,21.14-59.13,14.76-10.12-2.87-17.81-9.4-25-16.72-3.51-3.57-7.4-3.78-10.61-.91-3.36,3-3.6,7.24-.57,11.14,.82,1.05,1.71,2.05,2.67,2.98,14.36,13.91,31.35,21.56,51.53,21.63Z" />
          <path d="M9.1,74.74c7.53-18.9,18.66-34.2,33.63-46.69C66.5,8.22,94.08-1.66,124.84,.23c48.06,2.95,82.97,26.54,104.05,70.13,1.54,3.19,1.64,4.96-2.67,4.4-1.15-.15-2.34-.12-3.49,0-4.69,.45-8.12-.41-11.17-5.02-4.56-6.88-12.11-9.78-20.3-9.93-12.66-.23-25.33-.28-37.99,.02-9.18,.21-16.75,4.14-21.83,11.98-1.46,2.26-2.98,3.31-5.62,2.96-1.31-.17-2.67-.11-3.99-.02-6.73,.47-12.48,.28-16.96-6.75-3.85-6.05-11.28-8.08-18.51-8.2-12.66-.21-25.33-.24-37.99,0-8.59,.17-16.03,3.55-20.96,10.72-2.28,3.33-4.62,4.65-8.49,4.26-2.96-.3-5.98-.06-9.81-.06Z" />
          <path d="M67.06,127.49c-6.48-.4-12.99,.52-19.44-.53-6.38-1.04-9.67-4.14-9.87-10.54-.32-10.31-.33-20.65,.05-30.95,.24-6.48,4.56-10.35,11.1-10.44,12.32-.17,24.64-.19,36.96,0,6.89,.11,11.05,4.49,11.17,11.49,.16,9.65,.16,19.31,0,28.97-.11,6.88-3.29,10.36-10.04,11.46-6.62,1.08-13.29,.12-19.94,.54Zm19.05-22.65c0-6.46-4.86-11.2-11.41-11.15-6.35,.05-10.98,4.61-11.11,10.93-.13,6.52,4.6,11.36,11.14,11.4,6.55,.04,11.39-4.71,11.38-11.18Z" />
          <path d="M172.32,74.97c5.83,0,11.66-.07,17.48,.01,7.84,.11,12.14,4.24,12.25,11.97,.13,9.32,.12,18.65,0,27.97-.09,7.49-3.14,11.39-10.5,12-12.77,1.05-25.61,.95-38.38,.04-6.99-.5-10.3-4.15-10.5-10.99-.29-9.98-.29-19.98,.04-29.96,.23-7.02,4.56-10.87,11.62-11.02,5.99-.13,11.99-.03,17.98-.03Zm3.8,29.84c-.02-6.46-4.88-11.19-11.43-11.12-6.35,.06-10.97,4.63-11.08,10.95-.12,6.52,4.62,11.34,11.16,11.37,6.55,.03,11.38-4.73,11.36-11.2Z" />
        </svg>
      ),
      position: window.innerWidth < 768 ? "top-right" : "bottom-right",
    });
  }
  static warning(message: string) {
    toast.warning(message, {
      icon: <FaSurprise className="text-[#f1c40f] text-2xl" />,
      position: window.innerWidth < 768 ? "top-right" : "bottom-right",
    });
  }
}
