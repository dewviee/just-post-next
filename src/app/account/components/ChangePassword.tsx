import AccountField from "@/components/Account/AccountField";
import Modal from "@/components/Modal/Modal";
import ModalAction from "@/components/Modal/ModalAction";
import TextField from "@/components/TextField";
import {
  CONST_CHANGE_USER_PASSWORD_SUCCESSFULLY,
  CONST_NEW_PASSWORD_NOT_MATCH,
} from "@/constants/message";
import { TChangePasswordForm, useUser } from "@/hooks/useUser";
import { TApiError } from "@/types/api.type";
import { cn } from "@/utils/classname";
import { ChangeEvent, HTMLAttributes, useState } from "react";
import { toast } from "react-toastify";

type TChangePasswordProps = HTMLAttributes<HTMLDivElement> & {};

const initChangePassForm: TChangePasswordForm = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePassword({
  className,
  ...props
}: TChangePasswordProps) {
  const { changeUserPassword } = useUser();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] =
    useState<TChangePasswordForm>(initChangePassForm);

  const handleOpenEditDialog = () => {
    setIsEdit(true);
  };

  const handleCloseEditDialog = () => {
    setIsEdit(false);
    handleResetForm();
  };

  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetForm = () => {
    setFormData(initChangePassForm);
  };

  const handleChangePassword = () => {
    if (!validateMatchPassword(formData)) return;

    changeUserPassword(
      formData,
      handleChangePasswordSuccess,
      handleChangePasswordError,
    );
  };

  const validateMatchPassword = (form: TChangePasswordForm): boolean => {
    if (form.newPassword !== form.confirmNewPassword) {
      toast.error(CONST_NEW_PASSWORD_NOT_MATCH);
      return false;
    }

    return true;
  };

  const handleChangePasswordSuccess = () => {
    toast.success(CONST_CHANGE_USER_PASSWORD_SUCCESSFULLY, {
      closeOnClick: true,
    });
    handleResetForm();
    handleCloseEditDialog();
  };

  const handleChangePasswordError = (err: unknown) => {
    const error = err as TApiError;

    if (error.message) {
      toast.error(error.message);
    }
  };

  const isFormNotEmpty = (): boolean => {
    return !(
      !!formData.confirmNewPassword &&
      !!formData.newPassword &&
      !!formData.oldPassword
    );
  };

  return (
    <div {...props} className={cn("", className)}>
      <AccountField title="Change Password" onClick={handleOpenEditDialog}>
        ●●●●●●●●
      </AccountField>

      <Modal isOpen={isEdit} handleClickOutside={handleCloseEditDialog}>
        <TextField
          label="Old Password"
          className="w-full"
          inputType="password"
          inputValue={formData.oldPassword}
          inputName="oldPassword"
          onChange={handleFormDataChange}
        />
        <TextField
          label="New Password"
          className="w-full"
          inputType="password"
          inputValue={formData.newPassword}
          inputName="newPassword"
          onChange={handleFormDataChange}
        />
        <TextField
          label="Confirm New Password"
          className="w-full"
          inputType="password"
          inputValue={formData.confirmNewPassword}
          inputName="confirmNewPassword"
          onChange={handleFormDataChange}
        />
        <ModalAction
          onClose={handleCloseEditDialog}
          onSuccess={handleChangePassword}
          disableBtnSuccess={isFormNotEmpty()}
        />
      </Modal>
    </div>
  );
}
