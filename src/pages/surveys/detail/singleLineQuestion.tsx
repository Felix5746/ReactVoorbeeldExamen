import {FunctionComponent} from 'react'

interface SingleLineQuestionProps {
title: string
}

const SingleLineQuestion: FunctionComponent<SingleLineQuestionProps> = ({title}) => {
    return (
        <div className={'question'}>
            <div>
                <h3>{title}</h3>
                <input disabled/>
            </div>
            <div>
                <button>X</button>
            </div>
        </div>
    )
}

export default SingleLineQuestion
