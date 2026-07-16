import { useAppStore } from "../../store";
import { AccountSecurityPage } from "../../components/AccountSecurityPage";

export function CounselorAccountSecurity() {
  const { popView } = useAppStore();

  return (
    <AccountSecurityPage onBack={popView} />
  );
}
