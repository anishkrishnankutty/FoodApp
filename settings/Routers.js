import { createStackNavigator, createAppContainer } from "react-navigation";

// Screens
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import Home from "../screens/Home";

const AppNavigator = createStackNavigator({
    Register: {
        screen: Register
    },
    Login: {
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    Home: {
        screen: Home
    }
},
{
  initialRouteName: "Register"
});

export default createAppContainer(AppNavigator);