import AppLayout from "@/components/layout/app-layout";
import HomePage from "@/pages/marketing/home";
import AboutPage from "@/pages/marketing/about/page";
import ContactPage from "@/pages/marketing/contact/page";
import HouseDetailPage from "@/pages/marketing/listings/detail/house-detail";
import VehicleDetailPage from "@/pages/marketing/listings/detail/vehicle-detail";
import HousesListPage from "@/pages/marketing/listings/houses";
import VehiclesListPage from "@/pages/marketing/listings/vehicles";
import { AuthLayout, SignInPage, SignUpPage } from "@/pages/others/auth";
import { Error404Page } from "@/pages/main/pages";
import OwnerGuard from "@/pages/owner/guard";
import OwnerOverviewPage from "@/pages/owner/overview";
import OwnerMaisonsPage from "@/pages/owner/maisons";
import OwnerVehiculesPage from "@/pages/owner/vehicules";
import OwnerDemandesPage from "@/pages/owner/demandes";
import OwnerProfilePage from "@/pages/owner/profile";
import OwnerAddMaisonPage from "@/pages/owner/add-maison";
import OwnerAddVehiculePage from "@/pages/owner/add-vehicule";
import { RouteProgress } from "@/components/shared/route-progress";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <>
    <RouteProgress />
    <Routes>
      {/* Marketing / public site */}
      <Route index element={<HomePage />} />
      <Route path="/maisons" element={<HousesListPage />} />
      <Route path="/maisons/:id" element={<HouseDetailPage />} />
      <Route path="/vehicules" element={<VehiclesListPage />} />
      <Route path="/vehicules/:id" element={<VehicleDetailPage />} />
      <Route path="/a-propos" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Owner dashboard */}
      <Route element={<OwnerGuard />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<OwnerOverviewPage />} />
          <Route path="/dashboard/maisons" element={<OwnerMaisonsPage />} />
          <Route
            path="/dashboard/maisons/ajouter"
            element={<OwnerAddMaisonPage />}
          />
          <Route path="/dashboard/vehicules" element={<OwnerVehiculesPage />} />
          <Route
            path="/dashboard/vehicules/ajouter"
            element={<OwnerAddVehiculePage />}
          />
          <Route path="/dashboard/demandes" element={<OwnerDemandesPage />} />
          <Route path="/dashboard/profil" element={<OwnerProfilePage />} />
        </Route>
      </Route>

      {/* Auth — propriétaire only */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      <Route path="/error-404" element={<Error404Page />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
    </>
  );
}
