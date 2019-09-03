import { createStackNavigator, createAppContainer } from "react-navigation";

// Screens
import Register from "../screens/Register";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import Home from "../screens/Home";
import Data from "../screens/Data";


const AppNavigator = createStackNavigator({
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
    Home: {
        screen: Home
    },
    Data: {
        screen: Data
    },
 
},
{
  initialRouteName: "Register"
});

export default createAppContainer(AppNavigator);