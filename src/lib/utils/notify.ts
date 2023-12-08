import Toast, { ToastShowParams } from "react-native-toast-message";


export function notify(props: ToastShowParams & { type: 'success' | 'error' }) {
    Toast.show(props)
}