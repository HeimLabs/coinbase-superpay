"use client"

import styles from "./page.module.scss"
import BuyIcon from "@/src/assets/buy.svg"
import SendIcon from "@/src/assets/send.svg"
import InvoiceIcon from "@/src/assets/invoice.svg"
import ActionCard from "@/components/ActionCard"
import ActivityChart from "@/components/ActivityChart"
import HomeTable from "@/components/HomeTable"
import { useGetUserActivity } from "@/hooks/useGetUserActivity"
import { useGetOnrampBuyUrl } from "@/hooks/useGetOnrampBuyUrl"
import Dropdown, { OptionType } from "@/components/Dropdown"
import { useMemo, useState } from "react"
import { ActivityTimeFilter } from "@/types/api.types"
import { formatNumber } from "@/lib/utils"
import Skeleton from "react-loading-skeleton"
import { useAuth } from "@clerk/nextjs"

export default function Page() {
    const { isLoaded, isSignedIn } = useAuth();
    const [selectedTimeFilter, setSelectedTimeFilter] = useState(chartTimeOptions[0]);
    const { data: activityData, isFetching } = useGetUserActivity(selectedTimeFilter.value as ActivityTimeFilter);
    const { data: onrampData } = useGetOnrampBuyUrl();

    const actionCardItems = useMemo(() => [
        {
            icon: <BuyIcon />,
            title: "Buy USDC",
            description: "Earn 4.1% with USDC Rewards",
            action: "Buy",
            url: onrampData?.onrampBuyUrl || ""
        },
        {
            icon: <SendIcon />,
            title: "Send USDC",
            description: "Send USDC Payments",
            action: "Send",
            url: "/funds/pay"
        },
        {
            icon: <InvoiceIcon />,
            title: "Invoice",
            description: "Create and Send USDC Invoices",
            action: "Create",
            url: "/invoice/create"
        }
    ], [onrampData])

    if (!isLoaded || !isSignedIn) return <></>

    return (
        <div className={styles.main}>
            {/* HERO/TOP SECTION */}
            <div className={styles.hero}>
                {/* ACTION CARDS */}
                <div className={styles.actionCardContainer}>
                    {actionCardItems.map((item, index) => {
                        return <ActionCard key={index} item={item} className={"home"} />
                    })}
                </div>
                {/* CHART + ACTIVITY */}
                <div className={styles.activityContainer}>
                    {/* HEADER INFO */}
                    <div className={styles.header}>
                        <div className={styles.topRow}>
                            <h3>Activity</h3>
                            <div className={styles.dropdownContainer}>
                                <Dropdown
                                    options={chartTimeOptions}
                                    selected={selectedTimeFilter}
                                    onChange={(option) => { setSelectedTimeFilter(option) }} />
                            </div>
                        </div>
                        <div className={styles.dataRow}>
                            <div className={styles.dataItem}>
                                <span className={styles.key}>Gross Volume</span>
                                <span className={styles.value}>
                                    {isFetching
                                        ? <Skeleton width={50} />
                                        : `$${formatNumber(activityData?.grossVolume)}` || "NA"}
                                </span>
                            </div>
                            <div className={styles.dataItem}>
                                <span className={styles.key}>Total Payments</span>
                                <span className={styles.value}>
                                    {isFetching
                                        ? <Skeleton width={50} />
                                        : `$${formatNumber(activityData?.totalPayments)}` || "NA"}
                                </span>
                            </div>
                            <div className={styles.dataItem}>
                                <span className={styles.key}>Total USDC Rewards</span>
                                <span className={styles.value}>
                                    {isFetching
                                        ? <Skeleton width={50} />
                                        : "$0"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <ActivityChart data={activityData?.volume} isLoading={isFetching} />
                </div>
            </div>
            {/* TABLE/HISTORY SECTION */}
            <div className={styles.tableContainer}>
                <HomeTable />
            </div>
        </div>
    );
}

const chartTimeOptions: OptionType[] = [
    {
        name: 'Last 24 hours',
        value: '1d'
    },
    {
        name: 'Last 1 week',
        value: '1w'
    },
    {
        name: 'Last 1 month',
        value: '1m'
    },
    {
        name: 'Last 6 months',
        value: '6m'
    },
    {
        name: 'Last 1 year',
        value: '1y'
    },
]