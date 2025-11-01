import SwalRaw from 'sweetalert2/dist/sweetalert2.js';
import type { SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import i18n from './i18n';
import { prefersReducedMotion } from './animations';

export const swalContainerWrapperId = 'swal2-container-wrapper';

let commonSwalOptions: SweetAlertOptions = {
  target: `#${swalContainerWrapperId}`,
};

if (prefersReducedMotion()) {
  commonSwalOptions = {
    ...commonSwalOptions,
    showClass: {
      popup: '',
      backdrop: '',
      icon: '',
    },
    hideClass: {
      popup: '',
      backdrop: '',
      icon: '',
    },
  };
}

const Swal = SwalRaw.mixin({
  ...commonSwalOptions,
});

export default Swal;

const swalToastOptions: SweetAlertOptions = {
  ...commonSwalOptions,
  toast: true,
  width: '50vw',
  position: 'top',
  showConfirmButton: false,
  showCloseButton: true,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (self) => {
    self.addEventListener('mouseenter', Swal.stopTimer);
    self.addEventListener('mouseleave', Swal.resumeTimer);
  },
  reverseButtons: true,
};

export const toast = Swal.mixin(swalToastOptions);

export const errorToast = (text: string) => toast.fire({
  icon: 'error',
  text,
});

export const showPlaybackFailedMessage = () => errorToast(i18n.t('Unable to playback this file. Try to convert to supported format from the menu'));

export const ReactSwal = withReactContent(Swal);
