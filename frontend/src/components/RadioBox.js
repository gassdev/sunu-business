import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const RadioBox = ({ prices, handleFilters }) => {

    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return prices.map((p, i) => (
        <div key={i}>
            <Form.Check
                type="radio"
                label={p.name}
                name={p}
                id={p.name}
                value={`${p._id}`}
                onChange={handleChange}
            ></Form.Check>
        </div>
    ))
}

export default RadioBox
