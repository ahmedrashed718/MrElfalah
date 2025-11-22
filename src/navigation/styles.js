import { Dimensions, Platform, StyleSheet } from "react-native";
import { COLORS } from "../constants";
import { RFValue } from "react-native-responsive-fontsize";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    tabBarIcon:
    {
        // position: 'absolute',
        // top: 12,
        // alignItems:"center",
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end"
    },
    Calculator:
    {

        // height: RFValue(55),
        // backgroundColor: "red",

        // justifyContent: 'center',
        // alignItems: 'center',

    },
    tabBarStyle:
    {
        backgroundColor: COLORS.white,
        height: RFValue(70),
        // alignItems: "flex-end",
        elevation: RFValue(5),
        borderTopLeftRadius: RFValue(15),
        borderTopRightRadius: RFValue(15),

        // padding: RFValue(10)
    },
    RequestsText: {
        fontSize: 10,
        color: COLORS.white,
        marginTop: 2,
        fontWeight: '500'
    }
});

export default styles