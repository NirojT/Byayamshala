import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
// Lazily loaded pages
const Auth = lazy(() => import("./pages/auth/auth"));
const Add = lazy(() => import("./pages/layout/private/add/add"));
const Saving = lazy(
  () => import("./pages/layout/private/add/finance/saving/saving")
);
const AddClassesForm = lazy(
  () =>
    import("./pages/layout/private/add/gymoperatiions/classes/add-classes-form")
);
const AddMemberForm = lazy(
  () =>
    import("./pages/layout/private/add/gymoperatiions/members/add-member-form")
);
const AddPlansForm = lazy(
  () => import("./pages/layout/private/add/gymoperatiions/plans/add-plans-form")
);

const Inventory = lazy(
  () => import("./pages/layout/private/inventory/inventory")
);
const List = lazy(() => import("./pages/layout/private/list/list"));
const PrivateLayout = lazy(
  () => import("./pages/layout/private/private_layout")
);
const Reports = lazy(() => import("./pages/layout/private/reports/reports"));

const AddCreditForm = lazy(
  () => import("./pages/layout/private/add/finance/credit/add-credit-form")
);
const AddSalesForm = lazy(
  () => import("./pages/layout/private/add/finance/sales/add-sales-form")
);
const AddExpenseForm = lazy(
  () => import("./pages/layout/private/add/finance/expense/add-expense-form")
);
const AddPurchaseForm = lazy(
  () => import("./pages/layout/private/add/finance/purchase/add-purchase-form")
);
const SavingDetails = lazy(
  () =>
    import("./pages/layout/private/add/finance/saving/component/saving-details")
);
const AddSupplierForm = lazy(
  () => import("./pages/layout/private/add/finance/supplier/add-supplier-form")
);
const EditClassesForm = lazy(
  () =>
    import(
      "./pages/layout/private/modify/gymoperatiions/classes/add-classes-form"
    )
);
const EditInventoryForm = lazy(
  () =>
    import(
      "./pages/layout/private/modify/gymoperatiions/inventory/add-Inventory-form"
    )
);
const EditMemberForm = lazy(
  () =>
    import(
      "./pages/layout/private/modify/gymoperatiions/members/edit-member-form"
    )
);
const EditPlansForm = lazy(
  () =>
    import("./pages/layout/private/modify/gymoperatiions/plans/edit-plans-form")
);

const AddPurchaseReturnForm = lazy(
  () =>
    import(
      "./pages/layout/private/add/finance/purchase return/add-purchase-return-form"
    )
);
const AddSalesReturnForm = lazy(
  () =>
    import(
      "./pages/layout/private/add/finance/sales return/add-sales-return-form"
    )
);
const AddFacilitiesForm = lazy(
  () =>
    import(
      "./pages/layout/private/add/gymoperatiions/facilities/add-facilities-form"
    )
);
const AddTask = lazy(
  () => import("./pages/layout/private/add/gymoperatiions/task/add-task")
);
const ItemCategory = lazy(
  () =>
    import(
      "./pages/layout/private/inventory/component/form/category/item-category"
    )
);
const ItemUnit = lazy(
  () => import("./pages/layout/private/inventory/component/form/unit/item-unit")
);
const InventoryHistory = lazy(
  () =>
    import(
      "./pages/layout/private/inventory/component/history/inventory-history"
    )
);
const FacilitiyList = lazy(
  () =>
    import(
      "./pages/layout/private/list/gymoperatiions/facilities/facilities-list"
    )
);
const MemberProfile = lazy(
  () =>
    import(
      "./pages/layout/private/list/gymoperatiions/members/component/profile/member-profile"
    )
);
const MemberList = lazy(
  () => import("./pages/layout/private/list/gymoperatiions/members/member-list")
);
const PlansProfile = lazy(
  () =>
    import(
      "./pages/layout/private/list/gymoperatiions/plans/component/profile/plans-profile"
    )
);
const PlansList = lazy(
  () => import("./pages/layout/private/list/gymoperatiions/plans/plans-list")
);
const SupplierProfile = lazy(
  () =>
    import(
      "./pages/layout/private/list/gymoperatiions/supplier/component/profile/supplier-profile"
    )
);
const SupplierList = lazy(
  () =>
    import("./pages/layout/private/list/gymoperatiions/supplier/supplier-list")
);
const TaskList = lazy(
  () => import("./pages/layout/private/list/gymoperatiions/task/task-list")
);

const MessageList = lazy(
  () => import("./pages/layout/private/message/component/message-list")
);
const MessageEdit = lazy(
  () => import("./pages/layout/private/message/edit/edit-message")
);
const Message = lazy(() => import("./pages/layout/private/message/message"));
const OAuth2RedirectHandler = lazy(
  () => import("./pages/auth/component/oAuth2-redirect-handler")
);
const Attendance = lazy(
  () => import("./pages/layout/private/attendance/attendance")
);
const EditFacilitiesForm = lazy(
  () =>
    import(
      "./pages/layout/private/modify/gymoperatiions/facilities/edit-facilities-form"
    )
);
const EditSupplierForm = lazy(
  () =>
    import(
      "./pages/layout/private/modify/gymoperatiions/supplier/edit-supplier-form"
    )
);
const Modify = lazy(() => import("./pages/layout/private/modify/modify"));
const PlansTask = lazy(
  () => import("./pages/layout/private/plans operation/component/plans-task")
);
const PlansOperation = lazy(
  () => import("./pages/layout/private/plans operation/plans-operation")
);
const ExpenseList = lazy(
  () => import("./pages/layout/private/reports/component/expense/expense-list")
);
const PartyAccountTransactions = lazy(
  () =>
    import("./pages/layout/private/party/component/party-account-transactions")
);
const PartyAccounts = lazy(
  () => import("./pages/layout/private/party/party-accounts")
);
const PurchaseList = lazy(
  () =>
    import("./pages/layout/private/reports/component/purchase/purchase-list")
);
const SalesList = lazy(
  () => import("./pages/layout/private/reports/component/sales/sales-list")
);

const GettingStarted = lazy(
  () => import("./pages/gettingstarted/getting-started")
);

const MembersBulkImport = lazy(
  () =>
    import(
      "./pages/layout/private/add/gymoperatiions/members/component/members-bulk-import"
    )
);
const AddVisitorForm = lazy(
  () =>
    import(
      "./pages/layout/private/add/gymoperatiions/visitors/add-visitor-form"
    )
);
const VisitorsList = lazy(
  () =>
    import("./pages/layout/private/list/gymoperatiions/visitors/visitors-list")
);

const ProfileArcheived = lazy(
  () =>
    import(
      "./pages/layout/private/profile/account-settings/component/archeived/profile-archeived"
    )
);
const ChangePassword = lazy(
  () =>
    import(
      "./pages/layout/private/profile/account-settings/component/account-settings/change-password"
    )
);
const InnerAccountOptions = lazy(
  () =>
    import(
      "./pages/layout/private/profile/account-settings/component/account-settings/account-setttings"
    )
);
const BusinessStats = lazy(
  () =>
    import(
      "./pages/layout/private/reports/component/business_stats/business-stats"
    )
);

const MemberShipList = lazy(
  () =>
    import(
      "./pages/layout/private/reports/component/membership/membership-list"
    )
);

const Cafe = lazy(() => import("./pages/layout/private/cafe/cafe"));
const Tables = lazy(() => import("./pages/layout/private/cafe/tables/tables"));
const Menus = lazy(() => import("./pages/layout/private/cafe/menus/menu"));
const TakeOrder = lazy(
  () => import("./pages/layout/private/cafe/takeorder/take-order")
);
const OrderTable = lazy(
  () => import("./pages/layout/private/cafe/orders/order-table")
);
const DayEndClosings = lazy(
  () =>
    import(
      "./pages/layout/private/reports/component/dayendclosing/day-end-closing"
    )
);
const DayEndClosingList = lazy(
  () =>
    import(
      "./pages/layout/private/reports/component/dayendclosing/component/day-end-closing-list"
    )
);
const WorkOutPlans = lazy(
  () => import("./pages/layout/private/workoutplan/work-out-plans")
);
const WorkOutPlanForm = lazy(
  () =>
    import("./pages/layout/private/workoutplan/component/work-out-plan-form")
);
const WorkOutPublicView = lazy(
  () =>
    import("./pages/layout/private/workoutplan/component/work-out-public-view")
);

// Static imports that shouldn't be lazy loaded

import Toaster from "./global/components/toaster/toaster";
import { useGlobalStore } from "./global/store";

import PageNotFound from "./global/components/404/page-not-found";
import OAuth2ErrorPage from "./global/components/error/oauth-error";
import CoolSpinner from "./global/components/loader/suspense-loader";
import AddStaffForm from "./pages/layout/private/add/gymoperatiions/staff/add-staff-form";
import AttendancePublicView from "./pages/layout/private/attendance-public/attendance-public";
import EquipmentDashboard from "./pages/layout/private/equipment/equipment-dashboard";
import MemberProfileAttendance from "./pages/layout/private/list/gymoperatiions/members/component/profile/component/attendance/member-profile-attendance";
import StaffProfile from "./pages/layout/private/list/gymoperatiions/staff/component/profile/staff-profile";
import StaffList from "./pages/layout/private/list/gymoperatiions/staff/staff-list";
import Biometrics from "./pages/layout/private/profile/account-settings/biometrics/biometrics";
import BiometricDeviceCommands from "./pages/layout/private/profile/account-settings/biometrics/component/biometrics-commands";
import BiometricsForm from "./pages/layout/private/profile/account-settings/biometrics/component/biometrics-form";
import AccountSettings from "./pages/layout/private/profile/account-settings/component/account-settings/update-business-details";
import AppUserHelp from "./pages/layout/private/profile/components/appUser-help";
import AppUserPlans from "./pages/layout/private/profile/plans/plans";
import Profile from "./pages/layout/private/profile/profile";
import QRCode from "./pages/layout/private/qrcode/qrcode";

import SalaryList from "./pages/layout/private/list/gymoperatiions/staff/component/profile/component/list/salary-list";
import AdjustmentList from "./pages/layout/private/list/gymoperatiions/staff/component/profile/component/list/salary-adjustment-list";
import StaffProfileAttendance from "./pages/layout/private/list/gymoperatiions/staff/component/attendance/staff-profile-attendance";
import EditStaffForm from "./pages/layout/private/modify/gymoperatiions/staff/edit-staff-form";

import SystemUsers from "./pages/layout/private/systemuser/system-users";
import SystemUsersLogs from "./pages/layout/private/systemuser/component/systemlogs/system-users-logs";
import MemberFacilityList from "./pages/layout/private/reports/component/memberfacility/memberfacility-list";
import Pos from "./pages/layout/private/pos/pos";
import PaymentModePage from "./pages/layout/private/paymentmode/payment-mode-page";
import Dashboard from "./pages/layout/private/dashboard/dashboard";
function App() {
  //  lazy loading
  // const ViewAffiliateDetails = lazy(() => import('./pages/layout/super/appusers/affiliatedeatils/view-affiliate-detils'))

  const { toasterData, closeToaster } = useGlobalStore();

  //for prod
  // useEffect(() => {
  //   // only navigate if outside protected routes

  //   const isOnRootOrAuthPages =
  //     location.pathname === "/" ||
  //     location.pathname === "/auth" ||
  //     location.pathname === "/auth/" ||
  //     location.pathname === "/getting-started" ||
  //     location.pathname === "/getting-started/" ||
  //     location.pathname === "/oauth2/redirect";

  //   if (isAuthChecked && appUser?.email && isOnRootOrAuthPages) {
  //     handleNavigateToPrivateOrPublic(appUser, clearAppUser, navigate);
  //   }
  // }, [appUser, location.pathname, isAuthChecked]);

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // if (!isAuthChecked) {
  //   return <CoolSpinner />; // or your loading spinner
  // }
  return (
    <>
      <Toaster data={toasterData} close={closeToaster} />
      {/* <ErrorBoundary fallback={<Error />}> */}
      <Suspense fallback={<CoolSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Auth />} />

          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/oauth2/error" element={<OAuth2ErrorPage />} />

          <Route path="" element={<Auth />} />
          <Route path="/" element={<Auth />} />

          <Route path="/getting-started" element={<GettingStarted />} />

          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
          {/* Private Routes */}
          {/* <Route
            element={
              <ProtectedRoute
                allowedRoles={[
                  AppUserRoles.ROLE_SUPER_ADMIN,
                  AppUserRoles.ROLE_ADMIN,
                ]}
              />
            }
          > */}
          {/* <Route path="/getting-started" element={<GettingStarted />} /> */}
          <Route path="/tenant/" element={<PrivateLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="create-attendance" element={<Attendance />} />
            <Route path="add" element={<Add />} />
            {/* plans/operation/task */}
            <Route path="renew" element={<PlansOperation />} />
            <Route path="plans/operation/task" element={<PlansTask />} />
            {/* for add */}
            {/* Gym operation Routes */}
            <Route
              path="add/gym/operation/members"
              element={<AddMemberForm />}
            />
            <Route path="bulk-import-members" element={<MembersBulkImport />} />
            <Route
              path="add/gym/operation/visitors"
              element={<AddVisitorForm />}
            />

            <Route path="add/gym/operation/staff" element={<AddStaffForm />} />
            <Route path="add/gym/operation/plans" element={<AddPlansForm />} />
            <Route
              path="add/gym/operation/classes"
              element={<AddClassesForm />}
            />
            <Route
              path="add/gym/operation/facilities"
              element={<AddFacilitiesForm />}
            />

            <Route path="add/gym/operation/task" element={<AddTask />} />
            {/* Finance Routes */}
            <Route path="add/finance/savings" element={<Saving />} />
            <Route path="add/finance/expenses" element={<AddExpenseForm />} />
            <Route path="add/finance/sales" element={<AddSalesForm />} />
            <Route path="add/finance/credits" element={<AddCreditForm />} />
            <Route path="add/finance/suppliers" element={<AddSupplierForm />} />
            <Route path="add/finance/purchase" element={<AddPurchaseForm />} />
            <Route
              path="add/finance/sales-returns"
              element={<AddSalesReturnForm />}
            />
            <Route
              path="add/finance/purchase-returns"
              element={<AddPurchaseReturnForm />}
            />
            <Route path="add/finance/task" element={<AddPurchaseForm />} />
            <Route
              path="add/finance/savings/:accountId"
              element={<SavingDetails />}
            />
            <Route path="modify" element={<Modify />} />
            {/* for Edit */}
            {/* Gym operation Routes */}
            <Route
              path="edit/gym/operation/members"
              element={<EditMemberForm />}
            />

            <Route
              path="edit/gym/operation/staff"
              element={<EditStaffForm />}
            />
            <Route
              path="edit/gym/operation/plans"
              element={<EditPlansForm />}
            />
            <Route
              path="edit/gym/operation/facilities"
              element={<EditFacilitiesForm />}
            />
            <Route
              path="edit/gym/operation/classes"
              element={<EditClassesForm />}
            />
            <Route
              path="edit/gym/operation/inventory"
              element={<EditInventoryForm />}
            />
            <Route
              path="edit/gym/operation/supplier"
              element={<EditSupplierForm />}
            />
            {/* Finance Routes */}

            {/* for List */}
            {/* Gym operation Routes */}
            <Route path="list" element={<List />} />
            <Route path="list/gym/operation/members" element={<MemberList />} />
            <Route
              path="list/gym/operation/visitors"
              element={<VisitorsList />}
            />

            {/* member-profile */}
            <Route path="member-profile" element={<MemberProfile />} />
            <Route path="staff-profile" element={<StaffProfile />} />
            <Route
              path="member-attendance"
              element={<MemberProfileAttendance />}
            />
            <Route
              path="staff-attendance"
              element={<StaffProfileAttendance />}
            />
            {/* Staffs */}

            <Route path="list/gym/operation/staff" element={<StaffList />} />
            <Route path="staff/salary/:id" element={<SalaryList />} />
            <Route
              path="staff/salary-adjustment/:id"
              element={<AdjustmentList />}
            />

            {/* plans */}
            <Route path="list/gym/operation/plans" element={<PlansList />} />
            {/* tasks */}
            <Route path="list/gym/operation/task" element={<TaskList />} />
            {/* supplier */}
            <Route
              path="list/gym/operation/supplier"
              element={<SupplierList />}
            />
            {/*plans-profile */}
            <Route path="plans-profile" element={<PlansProfile />} />
            {/*plans-profile */}
            <Route path="supplier-profile" element={<SupplierProfile />} />
            {/* plans */}
            <Route
              path="list/gym/operation/facilities"
              element={<FacilitiyList />}
            />

            <Route path="stock" element={<Inventory />} />
            <Route path="inventory/category" element={<ItemCategory />} />
            <Route path="inventory/unit" element={<ItemUnit />} />

            {/* history */}
            <Route path="inventory/history" element={<InventoryHistory />} />

            <Route path="message" element={<Message />} />
            <Route path="message/list" element={<MessageList />} />
            <Route path="message/edit" element={<MessageEdit />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/sales" element={<SalesList />} />
            <Route path="reports/purchase" element={<PurchaseList />} />
            <Route path="reports/expenses" element={<ExpenseList />} />
            <Route path="reports/membership" element={<MemberShipList />} />
            <Route path="reports/facilities" element={<MemberFacilityList />} />

            <Route path="reports/business_stats" element={<BusinessStats />} />
            <Route
              path="reports/day_end_closing"
              element={<DayEndClosings />}
            />
            <Route
              path="reports/day_end_closing/list"
              element={<DayEndClosingList />}
            />

            {/* pos */}

            <Route path="pos" element={<Pos />} />
            <Route path="paymentmode" element={<PaymentModePage />} />

            {/* profile pages */}
            <Route path="profile" element={<Profile />} />
            {/* profile pages */}
            <Route path="profile/archieved" element={<ProfileArcheived />} />
            <Route
              path="profile/account-settings"
              element={<InnerAccountOptions />}
            />
            <Route
              path="profile/account-settings/change-password"
              element={<ChangePassword />}
            />
            <Route
              path="profile/account-settings/update-account-info"
              element={<AccountSettings />}
            />

            {/* for plans and help section of profile */}
            <Route path="profile/help" element={<AppUserHelp />} />
            <Route path="profile/plans" element={<AppUserPlans />} />

            {/* for cafe */}
            <Route path="cafe" element={<Cafe />} />
            <Route path="tables" element={<Tables />} />
            <Route path="menus" element={<Menus />} />
            <Route path="take-order" element={<TakeOrder />} />
            <Route path="orders" element={<OrderTable />} />

            {/* for workout */}
            <Route path="workoutplan" element={<WorkOutPlans />} />
            <Route path="workoutplan/form" element={<WorkOutPlanForm />} />
            {/* for biometrics */}
            <Route path="biometrics" element={<Biometrics />} />
            <Route path="biometrics/form" element={<BiometricsForm />} />
            <Route
              path="biometrics/commands"
              element={<BiometricDeviceCommands />}
            />

            {/* for party */}
            <Route path="party" element={<PartyAccounts />} />
            <Route
              path="party-accounts-transaction"
              element={<PartyAccountTransactions />}
            />
            {/* for equipment */}
            <Route path="equipment" element={<EquipmentDashboard />} />
            <Route path="qrcode" element={<QRCode />} />

            {/* for System Users */}
            <Route path="system-users" element={<SystemUsers />} />
            <Route path="system-users/logs" element={<SystemUsersLogs />} />
          </Route>
          {/* </Route> */}

          {/* for custome  */}
          <Route
            path="/workout/:businessName"
            element={<WorkOutPublicView />}
          />
          <Route
            path="/checkins/:businessName"
            element={<AttendancePublicView />}
          />

          {/* ✅ catch-all route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default App;
