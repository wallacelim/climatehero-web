import React, {useState} from 'react'
import { ActivityPopover } from './ActivityPopover'
import {
    StandardListItem,
    ProgressIndicator,
    Title,
    TitleLevel,
    FlexBox,
    FlexBoxDirection
} from '@ui5/webcomponents-react'


export default function Goal(props) {

    const [info, setInfo] = useState(props.info)
    const [infoState, setInfoState] = useState(props.infoState)
    const [progress, setProgress] = useState(props.progress)
    const [text, setText] = useState(props.text)


    const styles = {
        height: '80px'
    }
    return (
        <StandardListItem
            info={info}
            infoState={infoState}
            style={styles}>
            <FlexBox direction={FlexBoxDirection.Column}>
                <Title level={TitleLevel.H5}>{text}</Title>
                <ProgressIndicator
                    displayValue={progress + "%"}
                    percentValue={progress}
                    width="180px"
                    state={infoState} />
            </FlexBox>
        </StandardListItem>
    )
}