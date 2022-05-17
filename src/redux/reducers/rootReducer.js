import AuthReducer from "./AuthReducer";
import ExpLogReducer from "./ExpLogReducer";
import MonthlyDocReducer from "./MonthlyDocReducer";
import ProfileReducer from "./ProfileReducer";
import SidebarReducer from "./SidebarReducer";
import SubscriptionReducer from "./SubscriptionReducer";
import TraineesReducer from "./TraineesReducer";

export default {
    Auth: AuthReducer,
    ExpLog: ExpLogReducer,
    Subscription: SubscriptionReducer,
    Sidebar: SidebarReducer,
    Profile: ProfileReducer,
    MonthlyDoc: MonthlyDocReducer,
    Trainees: TraineesReducer
}