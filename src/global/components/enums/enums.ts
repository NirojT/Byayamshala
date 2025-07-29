export enum ShiftType {
  ALL = "ALL",
  MORNING = "MORNING",
  EVENING = "EVENING",
  AFTERNOON = "AFTERNOON",

  NIGHT = "NIGHT",
}
export enum PaymentMode {
  CASH = "CASH",
  BANK = "BANK",
  CHEQUE = "CHEQUE",
  CARD = "CARD",
  FULL_CREDIT = "FULL_CREDIT", // Adding credit as a payment mode
  PARTIAL_CREDIT = "PARTIAL_CREDIT", // Adding credit as a payment mode
}
export enum MemberShipStaus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}
export enum DeliveryType {
  WHATSAPP = "WHATSAPP",
  EMAIL = "EMAIL",
  BOTH = "BOTH",
}
export enum SendWhom {
  ALL = "ALL",
  MEMBER = "MEMBER",
  STAFF = "STAFF",

  // TRAINER = "TRAINER",
}
export enum ItemType {
  SUPPLEMENTS = "SUPPLEMENTS",
  GYM_APPAREL = "GYM_APPAREL",

  GYM_ACCESSORIES = "GYM_ACCESSORIES",
  GYM_FOOD = "GYM_FOOD",
  GYM_DRINKS = "GYM_DRINKS",

  EQUIPMENT = "FITNESS_EQUIPMENT",
}

export enum PartyMoneyType {
  TO_GIVE = "TO_GIVE",
  TO_RECEIVE = "TO_RECEIVE",
  SETTLED = "SETTLED",
  YOU_GAVE = "YOU_GAVE",
  YOU_RECEIVED = "YOU_RECEIVED",
} // UTILITIES,         // Electricity, Water, Internet, etc.
// SALARIES,          // Staff payments
// RENT,              // Rent for the building
// MAINTENANCE,       // Equipment or facility repairs
// COMPLEMENTARY,     // Free items/services given to members
// TRAVEL,            // Business travel, transport, fuel
// MARKETING,         // Ads, promotions, flyers, social media
// SUPPLIES,          // Office or gym supplies (paper, soap, etc.)
// SUBSCRIPTIONS,     // Software/tools subscriptions
// TRAINING,          // Staff training or seminars
// LICENSES_TAXES,    // Legal fees, government fees, tax
// FOOD_BEVERAGES,    // Snacks, water bottles for staff or gym
// HEALTHCARE,        // Medical or wellness expenses for staff
// EQUIPMENT,         // Buying new gym equipment
// OTHER              // Anything uncategorized
export enum ExpenseType {
  UTILITIES = "UTILITIES",
  SALARIES = "SALARIES",
  RENT = "RENT",
  MAINTENANCE = "MAINTENANCE",
  COMPLEMENTARY = "COMPLEMENTARY",
  TRAVEL = "TRAVEL",
  MARKETING = "MARKETING",

  SUPPLIES = "SUPPLIES",
  SUBSCRIPTIONS = "SUBSCRIPTIONS",
  TRAINING = "TRAINING",
  LICENSES_TAXES = "LICENSES_TAXES",
  FOOD_BEVERAGES = "FOOD_BEVERAGES",
  HEALTHCARE = "HEALTHCARE",
  EQUIPMENT = "EQUIPMENT",
  OTHER = "OTHER",
}

export enum PartyType {
  MEMBER = "MEMBER",
  SUPPLIER = "SUPPLIER",
  THIRD_PARTY = "THIRD_PARTY",
}
export enum ActivityType {
  OPENING = "OPENING",
  PURCHASE = "PURCHASE",
  SALES = "SALES",

  PURCHASE_RETURN = "PURCHASE_RETURN",
  SALES_RETURN = "SALES_RETURN",
  ADD = "ADD",
  DEDUCT = "DEDUCT",
  
}
export enum AppUserPlanType {
  FREE_TRIAL = "FREE_TRIAL",
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
  LIFETIME = "LIFETIME",
}
export enum AppUserRoles {
  ROLE_TRAIL = "ROLE_TRAIL", // trial
  ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN", // us
  ROLE_ADMIN = "ROLE_ADMIN", // users
  ROLE_AFFILIATE = "ROLE_AFFILIATE", // affiliates
  ROLE_UNKNOWN = "ROLE_UNKNOWN", // unknown
  // FOR FILTERING THE DATA
  ALL = "ALL",
}

export enum AppUserPaymentMode {
  // ESWA = "ESWA",
  // KHALTI = "KHALTI",
  QR = "QR",
  // NONE = "NONE",
}
export enum GettingStartedStep {
  PLANS = "plans",
  PAYMENT = "payment",
  BUSINESS_DETAILS = "businessDetails",
  REVIEW_DETAILS = "reviewDetails",
  COMPLETE = "complete",
}
export enum MemberShipStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}
export enum AffilaterPaymentStatus {
  UNPAID = "UNPAID",
  PAID = "PAID",
  CANCELED = "CANCELED",
}
export enum ReportPeriod {
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  // THIS_WEEK = "THIS_WEEK",
  THIS_MONTH = "THIS_MONTH",
  // LAST_MONTH = "LAST_MONTH",
  THIS_YEAR = "THIS_YEAR",
  CUSTOM_DATE = "CUSTOM_DATE",
}
export enum TransactionType {
  SALES = "SALES",
  PURCHASE = "PURCHASE", // Purchase-based transaction
  SALES_RETURN = "SALES_RETURN", // Sales return transaction
  PURCHASE_RETURN = "PURCHASE_RETURN", // Purchase return transaction

  EXPENSE = "EXPENSE", // Expense-based transaction
  MEMBERSHIP = "MEMBERSHIP", // Membership-based transaction
  ADDED_FACILITIES = "ADDED_FACILITIES", // Added facilities transaction
  PAYMENT_INCOMING = "PAYMENT_INCOMING", // Incoming payment
  PAYMENT_OUTGOING = "PAYMENT_OUTGOING", // Outgoing payment
  CASH = "CASH", // Cash-based transaction
  BANK = "BANK", // Bank-based transaction
  INVENTORY = "INVENTORY", // Related to inventory movements
  PARTY = "PARTY", // Related to a party (e.g., customer or supplier)
  SAVING_ACCOUNT = "SAVING_ACCOUNT",
  SAVING_WITHDRAWAL = "SAVING_WITHDRAWAL", // ➕ for withdrawals
  SAVING_DEPOSIT = "SAVING_DEPOSIT", // ➖ for deposits
  ADMISSION_FEE = "ADMISSION_FEE",
  CARD_FEE = "CARD_FEE",
  LOCKER_FEE = "LOCKER_FEE",
}

export enum MessageType {
  HOLIDAY = "HOLIDAY",
  OCCASION = "OCCASION",
  OFFER = "OFFER",
  MEMBERSHIP_EXPIRY = "MEMBERSHIP_EXPIRY",

  ANNOUNCEMENT = "ANNOUNCEMENT",
  WELCOME = "WELCOME",
  STOCK_ALERT = "STOCK_ALERT",
  ANNIVERSARY = "ANNIVERSARY",
  BIRTHDAY_WISH = "BIRTHDAY_WISH",
}

export enum FileType {
  CSV = "CSV",
  EXCEL = "EXCEL",
  PDF = "PDF",
}
export enum BulkTask {
  DELETE = "DELETE",
  DEACTIVATE = "DEACTIVATE",
  RESTORE = "RESTORE",
  ACTIVATE = "ACTIVATE",
  WHATSAPP_SAVED = "WHATSAPP_SAVED",
  DELETE_PERMANENTLY = "DELETE_PERMANENTLY",
}
export enum BulkSelect {
  MEMBER = "MEMBER",
  STAFF = "STAFF",
  PLAN = "PLAN",
}
export enum SavingActivity {
  /*
    OPENING_BALANCE ,
    ADD,
    WITHDRAW
    */
  OPENING_BALANCE = "OPENING_BALANCE",
  ADD = "ADD",
  WITHDRAW = "WITHDRAW",
}

export enum PrintFormat {
  POS = "POS",
  A4 = "A4",
}

export enum QueryFrom {
  OUTSIDER = "OUTSIDER",
  INSIDER = "INSIDER",
  BOTH = "BOTH",
}
export enum MenuType {
  DRINKABLE = "DRINKABLE",
  EATABLE = "EATABLE",
  BOTH = "BOTH",
}
export enum OrderStatus {
  ALL = "ALL",
  PENDING = "PENDING",
  UPDATED = "UPDATED",
  CANCELLED = "CANCELLED",
  SERVED = "SERVED",
  PAID = "PAID",
}
export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export enum StaffType {
 

  TRAINER = "TRAINER",
  RECEPTIONIST = "RECEPTIONIST",
  CLEANER = "CLEANER",
  SECURITY = "SECURITY",

  ALL_ROUNDER = "ALL_ROUNDER",
  COOK = "COOK",
  MANAGER = "MANAGER",
}
export enum AdjustmentType {
  ADVANCE= "ADVANCE",
    DEDUCTION= "DEDUCTION",
    BONUS="BONUS"
}
export enum AttendanceFrom {
 
  QR_CODE = "QR_CODE",
  MANUAL_ENTRY = "MANUAL_ENTRY",

  FINGERPRINT = "FINGERPRINT",
  CARD = "CARD",
}
export enum SystemUserType {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  // OPERATOR = "OPERATOR",
  // ...add other types as needed
}
export enum SystemUserSession {
  LOGED_IN= "LOGED_IN",
  LOGED_OUT= "LOGED_OUT",
}