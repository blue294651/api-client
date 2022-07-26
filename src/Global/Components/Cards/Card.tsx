import classNames from "classnames";
import React from "react";
import styles from "./Card.module.scss"

type CardProps = {
    children: React.ReactNode
    className?: string
}

const Card = ({children, className}: CardProps) => {
    return (
        <div className={classNames(styles.container, className)}>
            {children}
        </div>
    )
}

export default Card