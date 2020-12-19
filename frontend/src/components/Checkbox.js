import React from 'react'
import { Form } from 'react-bootstrap'

const Checkbox = ({ categories }) => {
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <Form.Check
                type="checkbox"
                label={c.name}
            ></Form.Check>
        </li>
    ))

}

export default Checkbox
