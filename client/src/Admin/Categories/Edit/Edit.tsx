import React, {useEffect} from "react";
import {useParams} from "react-router-dom"


type PropsType = {
    getCategory: (id: string) => void
}

const Edit: React.FC<PropsType> = props => {
    const {id} = useParams()
    const getCategory = props.getCategory

    useEffect(() => {
        getCategory(id)
    }, [getCategory])

    return <div>
        формочка
    </div>
}

export default Edit