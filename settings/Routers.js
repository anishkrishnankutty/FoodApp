import { createStackNavigator, createAppContainer } from "react-navigation";

// Screens
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";

const AppNavigator = createStackNavigator({
    Register: {
        screen: Register
    },
    Login: {
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    }
},
{
  initialRouteName: "Register"
});

export default createAppContainer(AppNavigator);