/* eslint-disable spaced-comment */
/// <reference types="react-scripts"/>
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dapp_img from "../dapp_img.png"
import eth_img from "../eth_img.png"
import dai_img from "../dai_img.png"
import { YourWallet } from "./yourWallet/YourWallet"
import { makeStyles } from "@material-ui/core"
import { ThemeContext } from "@emotion/react"
import { textAlign } from "@mui/system"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))


export const Main = () => {
    //Show token values from the wallet
    //Get the address of different tokens
    //Get the balance of the users wallet

    // send the brownie-config to our 'src' folder
    // send the build folder
    const classes = useStyles()
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    // const dappTokenAddress
    console.log(chainId)
    console.log(networkName)

    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero //look into mapping : 000
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero //brownie config
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    console.log(dappTokenAddress + wethTokenAddress + fauTokenAddress)

    const supportedTokens: Array<Token> = [
        {
            image: dapp_img,
            address: dappTokenAddress,
            name: "DAPP"
        },
        {
            image: eth_img,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai_img,
            address: fauTokenAddress,
            name: "DAI"
        }
    ]

    return (<>
        <h1 className={classes.title}>Token Farm App</h1>
        <YourWallet supportedTokens={supportedTokens} />
    </>)
}