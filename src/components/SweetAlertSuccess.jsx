import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SweetAlertSuccess = ({ title, text }) => {
  MySwal.fire({
    title: title,
    text: text,
    icon: 'success',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  });
}

export default SweetAlertSuccess
