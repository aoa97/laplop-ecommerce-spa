import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
    const history = useHistory()
    const [keyword, setKeyword] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form inline onSubmit={handleSearch}>
            <Form.Control
                placeholder='Search Products...'
                className='mr-sm-2 ml-sm-5 py-2'
                style={{ borderRadius: 0 }}
                onChange={e => setKeyword(e.target.value)}
            />

            <Button type='submit' variant='light' className='p-2'>
                Search
            </Button>
        </Form>
    );
}

export default SearchBox;