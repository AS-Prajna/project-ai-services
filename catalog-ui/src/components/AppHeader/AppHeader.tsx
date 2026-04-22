import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderPanel,
  Theme,
  Modal,
} from "@carbon/react";
import { User, Logout } from "@carbon/icons-react";
import styles from "./AppHeader.module.scss";
import { useReducer, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/auth";

type AppHeaderProps =
  | {
      minimal: true;
    }
  | {
      minimal?: false;
      isSideNavOpen: boolean;
      setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
    };

interface HeaderState {
  isProfileOpen: boolean;
  isLogoutModalOpen: boolean;
}

type HeaderAction =
  | { type: "SET_PROFILE_OPEN"; payload: boolean }
  | { type: "TOGGLE_PROFILE" }
  | { type: "SET_LOGOUT_MODAL_OPEN"; payload: boolean }
  | { type: "CLOSE_PROFILE_AND_OPEN_LOGOUT" }
  | { type: "CLOSE_LOGOUT_MODAL" };

const initialState: HeaderState = {
  isProfileOpen: false,
  isLogoutModalOpen: false,
};

function headerReducer(state: HeaderState, action: HeaderAction): HeaderState {
  switch (action.type) {
    case "SET_PROFILE_OPEN":
      return { ...state, isProfileOpen: action.payload };
    case "TOGGLE_PROFILE":
      return { ...state, isProfileOpen: !state.isProfileOpen };
    case "SET_LOGOUT_MODAL_OPEN":
      return { ...state, isLogoutModalOpen: action.payload };
    case "CLOSE_PROFILE_AND_OPEN_LOGOUT":
      return { ...state, isProfileOpen: false, isLogoutModalOpen: true };
    case "CLOSE_LOGOUT_MODAL":
      return { ...state, isLogoutModalOpen: false };
    default:
      return state;
  }
}

const AppHeader = (props: AppHeaderProps) => {
  const minimal = props.minimal === true;
  const [state, dispatch] = useReducer(headerReducer, initialState);
  const panelRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      dispatch({ type: "CLOSE_LOGOUT_MODAL" });
      navigate("/logout", { replace: true });
    }
  };

  useEffect(() => {
    if (!state.isProfileOpen) {
      return;
    }

    const handleDocumentMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsidePanel = panelRef.current?.contains(target) ?? false;
      const clickedUserTrigger =
        userIconRef.current?.contains(target) ?? false;

      if (!clickedInsidePanel && !clickedUserTrigger) {
        dispatch({ type: "SET_PROFILE_OPEN", payload: false });
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch({ type: "SET_PROFILE_OPEN", payload: false });
      }
    };

    document.addEventListener("mousedown", handleDocumentMouseDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [state.isProfileOpen]);

  return (
    <Theme theme="g100">
      <Header aria-label="IBM Open-Source AI Foundation for Power">
        {!minimal && (
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={(e) => {
              e.stopPropagation();
              props.setIsSideNavOpen((prev) => !prev);
            }}
            isActive={props.isSideNavOpen}
            isCollapsible
            className={styles.menuBtn}
          />
        )}

        <HeaderName prefix="IBM">
          Open-Source AI Foundation for Power
        </HeaderName>

        {!minimal && (
          <HeaderGlobalBar>
            <div
              ref={userIconRef}
              className={styles.userActionWrapper}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "TOGGLE_PROFILE" });
              }}
            >
              <HeaderGlobalAction
                aria-label="User"
                aria-haspopup="menu"
                aria-expanded={state.isProfileOpen}
                className={styles.iconWidth}
                isActive={state.isProfileOpen}
              >
                <User size={20} />
              </HeaderGlobalAction>
            </div>
            <HeaderPanel ref={panelRef} expanded={state.isProfileOpen}>
              <div className={styles.profilePanel}>
                <div className={styles.userprofile}>
                  <div>
                    <strong>Admin</strong>
                  </div>
                  <div className={styles.usercircle}>
                    <User size={16} />
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.logout}
                  onClick={() => {
                    dispatch({ type: "CLOSE_PROFILE_AND_OPEN_LOGOUT" });
                  }}
                >
                  <span>Log out</span>
                  <Logout size={16} />
                </button>
              </div>
            </HeaderPanel>
            <Theme theme="g10">
              <Modal
                open={state.isLogoutModalOpen}
                size="sm"
                primaryButtonText="Log out"
                secondaryButtonText="Cancel"
                modalHeading="Are you sure you want to log out of IBM Open-Source AI
                  Foundation for Power?"
                onRequestClose={() => {
                  dispatch({ type: "CLOSE_LOGOUT_MODAL" });
                }}
                onRequestSubmit={handleLogout}
              ></Modal>
            </Theme>
          </HeaderGlobalBar>
        )}
      </Header>
    </Theme>
  );
};

export default AppHeader;
