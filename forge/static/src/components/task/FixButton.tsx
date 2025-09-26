import React from "react"
import { GreyButton } from "../common/Button/ButtonStyled"
import { Issues } from "../../types/task.types"
import dayjs from "dayjs"
import { UpPriorityModal } from "../../features/Modal/UpPriorityModal"
import { UserAsignModal } from "../../features/Modal/UserAsignModal"

interface FixButtonProps {
    item: Issues
}

export const FixButton = React.memo(({ item }: FixButtonProps) => {

    const [prOpen, setPrOpen] = React.useState(false);
    const [asOpen, setAsOpen] = React.useState(false);

    const handleClosePr = () => {
        setPrOpen(false);
    };

    const handleCloseAs = () => {
        setAsOpen(false)
    }

    const handlePressed = () => {
        if (!item.fields.assignee?.displayName) {
            setAsOpen(true);
            return;
        }
        if ((item.fields.priority?.name === "Low" || item.fields.priority?.name === "Lower") && item.fields.duedate) {
            const diffDays = dayjs(item.fields.duedate).diff(dayjs(), "day");
            if (diffDays <= 4) {
                setPrOpen(true);
            }
            return;
        }
    }

    return (
        <>
            <GreyButton onClick={handlePressed}>Fix</GreyButton>
            {prOpen && <UpPriorityModal open={prOpen} handleClose={handleClosePr} id={item.id} />}
            {asOpen && <UserAsignModal open={asOpen} handleClose={handleCloseAs} taskId={item.id} />}
        </>
    )
})