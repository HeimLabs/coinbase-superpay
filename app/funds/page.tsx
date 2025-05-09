"use client"

import styles from "./Funds.module.scss";
import UsdcIcon from "../../src/assets/usdc.svg";
import TradeIcon from "../../src/assets/trade.svg";
import QrIcon from "../../src/assets/qr.svg";
import PayIcon from "../../src/assets/pay.svg";
import ActionCard from "@/components/ActionCard";
import HomeTable from "@/components/HomeTable";
import Image from "next/image";
import { useGetOnrampBuyUrl } from "@/hooks/useGetOnrampBuyUrl";
import { useMemo } from "react";

export default function Page() {
    const { data: onrampData } = useGetOnrampBuyUrl();

    const actionCardItems = useMemo(() => [
        {
            icon: <UsdcIcon />,
            title: "Buy USDC",
            description: "$1 USD = $1 USDC",
            action: "Buy",
            url: onrampData?.onrampBuyUrl || "",
            badge: <Image src={"/assets/coinbase-onramp-badge.png"} alt="coinbase onramp" width={108} height={28} />
        },
        {
            icon: <TradeIcon />,
            title: "Trade Funds",
            description: "Swap Currencies",
            action: "Swap",
            url: "/funds/trade"
        },
        {
            icon: <QrIcon />,
            title: "Receive Funds",
            description: "100% Free",
            action: "Scan",
            url: "/funds/receive"
        },
        {
            icon: <PayIcon />,
            title: "Make Payments",
            description: "Upload CSV",
            action: "Pay",
            url: "/funds/pay"
        }
    ], [onrampData])

    return (
        <div className={styles.main}>
            <div className={styles.actionCardContainer}>
                {actionCardItems.map((item, index) => {
                    return <ActionCard key={index} item={item} className={"funds"} />
                })}
            </div>
            <div className={styles.tableContainer}>
                <HomeTable />
            </div>
        </div>
    );
}
