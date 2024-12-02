import AccountField from "@/components/Account/AccountField";
import Modal from "@/components/Modal/Modal";
import ModalAction from "@/components/Modal/ModalAction";
import TextField from "@/components/TextField";
import { CONST_CHANGE_USERNAME_SUCCESSFULLY } from "@/constants/message";
import { useUser } from "@/hooks/useUser";
import { TUserProfile } from "@/types/user.type";
import { cn } from "@/utils/classname";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type EditUsernameProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  user: TUserProfile;
  onRefetchUserProfile?: () => void;
};

export default function EditUsername({
  className,
  user,
  onRefetchUserProfile,
  ...props
}: EditUsernameProps) {
  const { updateUserProfile } = useUser();
  const [username, setUsername] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleOpenEditDialog = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (!isEdit) return;
    setUsername(user?.username ?? "");

    return () => setUsername("");
  }, [isEdit, user]);

  const handleCloseEditDialog = () => {
    setIsEdit(false);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUpdateUsername = () => {
    const payload = { username: username } as TUserProfile;
    updateUserProfile(payload, () => {
      handleUpdateSuccess();
      onRefetchUserProfile?.();
      setIsEdit(false);
    });
  };

  const handleUpdateSuccess = () => {
    toast.success(CONST_CHANGE_USERNAME_SUCCESSFULLY, { closeOnClick: true });
  };

  return (
    <div {...props} className={cn("", className)}>
      <AccountField title="Username" onClick={handleOpenEditDialog}>
        {user?.username ?? ""}
      </AccountField>

      <Modal isOpen={isEdit} handleClickOutside={handleCloseEditDialog}>
        <TextField
          className="w-full"
          inputValue={username}
          inputName="Username"
          onInputChange={handleUsernameChange}
        />
        <ModalAction
          onClose={handleCloseEditDialog}
          onSuccess={handleUpdateUsername}
          disableBtnSuccess={username === user.username}
        />
      </Modal>
    </div>
  );
}
