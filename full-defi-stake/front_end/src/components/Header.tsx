import { useEthers } from "@usedapp/core"
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
        gap: theme.spacing(1)
    }
}))

export const Header = () => {
    const classes = useStyles()
    //from the docs to acticate Browser wallet
    const { account, activateBrowserWallet, deactivate } = useEthers()
    //if there is account it is connected else not
    const isConnected = account !== undefined

    return (
        <div className={classes.container}>
            <div>
                {isConnected ? (//ternary operator
                    <Button color="primary" variant="contained"
                        onClick={deactivate}>
                        Disconnect Wallet
                    </Button>
                ) : (
                    <Button color="primary" variant="contained"
                        onClick={() => activateBrowserWallet()}>
                        Connect Wallet
                    </Button>
                )
                }
            </div>
        </div>
    )
}