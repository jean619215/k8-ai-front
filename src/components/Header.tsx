"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import logoImage from "@/assets/icons/main-logo.svg";
import avatarImg from "@/assets/images/avatar.png";
import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/stores/useLayoutStore";
// import { i18nMenuOptions, II18nMenuOption } from "@/config/i18nOptions";
// import { LocalStorageKey } from "@/enums/index.enum";
// import useUserLogout from "@/hooks/useUserLogout";
// import { activateI18n } from "@/lib/provider/LanguageProvider";
// import { cn, setLocalStorage } from "@/lib/utils";
// import { useUserStore } from "@/stores/useUserStore";

enum PopperType {
  Language,
  User,
}

export default function Header({ className }: { className?: string }) {
  //   const { user, updateUser } = useUserStore();
  //   const { userLogoutLoading, logout } = useUserLogout();
  const { isShowingNavigation, setShowingNavigation } = useLayoutStore();

  const [showPopper, setShowPopper] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); //popper needs to be attached to an element
  const [popperType, setPopperType] = useState<PopperType>(PopperType.User);
  const router = useRouter();

  const handleOpenPopper = (
    event: React.MouseEvent<HTMLElement>,
    popperType: PopperType
  ) => {
    setPopperType(popperType);
    setAnchorEl(event.currentTarget);
    setShowPopper(!showPopper);
  };

  const handleClosePopper = () => {
    setAnchorEl(null);
    setShowPopper(false);
  };

  //   const handleSelectLanguage = (option: II18nMenuOption) => {
  //     activateI18n(option.locale);
  //     setLocalStorage(LocalStorageKey.USER_SELECTED_LANGUAGE, option.locale);
  //   };

  //   const handleLogout = async () => {
  //     try {
  //       const response = await logout();
  //       if (response && response.code === 0) {
  //         router.push("/login");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleChangePassword = () => {
    router.push("/change-password");
  };
  const handleChange2FA = () => {
    router.push("/change-2fa");
  };

  return (
    <header
      className={cn("relative flex items-center justify-between", className)}
    >
      <IconButton
        aria-label="menu"
        color="primary"
        onClick={() => setShowingNavigation(!isShowingNavigation)}
      >
        <MenuIcon />
      </IconButton>
      {/* <Image
        priority={true}
        src={logoImage}
        alt="Logo"
        width={172}
        className="ml-8"
      /> */}
      {/* <div className={cn("relative flex items-center gap-2")}>
        <IconButton
          color="primary"
          aria-label="add an alarm"
          onClick={(event) => handleOpenPopper(event, PopperType.Language)}
        >
          <LanguageIcon className=" text-black" />
        </IconButton>
        <IconButton
          disabled={!user}
          onClick={(event) => handleOpenPopper(event, PopperType.User)}
          sx={{ marginRight: "10px", borderRadius: "6px" }}
        >
          {user ? (
            <div className="flex items-center gap-1">
              <Avatar {...stringAvatar(user.name)} />
              <KeyboardArrowDownIcon />
            </div>
          ) : (
            <Image priority={true} src={avatarImg} alt="avatar" width={35} />
          )}
        </IconButton>
      </div> */}
      {/* {popperType === PopperType.Language ? (
        <Menu
          id="basic-menu"
          open={showPopper}
          onClick={handleClosePopper}
          anchorEl={anchorEl}
        >
          {i18nMenuOptions.map((option, index) => (
            <MenuItem key={index} onClick={() => handleSelectLanguage(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      ) : (
        <Menu
          id="basic-menu"
          open={showPopper}
          onClick={handleClosePopper}
          anchorEl={anchorEl}
        >
          <div className="px-4 pt-1.5 text-2 font-bold">{user?.name}</div>
          <div className="px-4 pb-3.5 text-4">{user?.email}</div>
          <MenuItem
            sx={{
              justifyContent: "center",
              paddingBlock: "8px",
            }}
            onClick={handleChangePassword}
          >
            <Trans>修改密碼</Trans>
          </MenuItem>
          <MenuItem
            sx={{
              justifyContent: "center",
              paddingBlock: "8px",
            }}
            onClick={handleChange2FA}
          >
            <Trans>修改 2FA</Trans>
          </MenuItem>
          <MenuItem
            sx={{
              justifyContent: "center",
              paddingBlock: "8px",
            }}
            onClick={handleLogout}
          >
            <Trans>登出</Trans>
          </MenuItem>
        </Menu>
      )} */}
    </header>
  );
}
