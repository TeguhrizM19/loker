import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const SweetAlertConfirmDelete = ({ onConfirm }) => {
  MySwal.fire({
    title: 'Apa Anda Yakin?',
    text: 'Menghapus Data? Ya / Tidak',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm(); // confirmasi Ya jika data dihapus
      MySwal.fire({      
        title: 'Terhapus!',
        text: 'Data Berhasil Dihapus.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  });

  return null;
};

export default SweetAlertConfirmDelete;
