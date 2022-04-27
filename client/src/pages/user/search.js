
import React, { useState } from 'react'

function Search(props) {
    const [SearchText, setSearchText] = useState("")

    const buildSearch = (e) => {
        setSearchText(e.target.value)

        props.refreshFunction(e.target.value)

    }

    return (
        <div>
            <input placeholder="Pesquisa aí" value={SearchText} onChange={buildSearch} 
            />
        </div>
    )
}

export default Search