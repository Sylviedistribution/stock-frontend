import { useResetRecoilState } from "recoil";
import { authTokenState, currentUserState } from "../state/authState";
import { toast } from "sonner";
import authApi from "../api/authApi";

export default function useLogout() {
  const resetUser = useResetRecoilState(currentUserState);
  const resetToken = useResetRecoilState(authTokenState);

  return async () => {
    try {
      // 🔐 Appel API pour révoquer le token sur le serveur
      await authApi.logout();
    } catch (err) {
      console.warn("Erreur lors de la déconnexion côté serveur :", err);
    }

    // 🧹 Nettoyage côté client
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    resetUser();
    resetToken();

    toast.info("Déconnexion réussie 👋");

    // 🔁 Redirection
    window.location.href = "/signin";
  };
}
