import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form } from 'react-bootstrap';
import axios from 'axios'

import { createProduct } from '../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
import Input from '../../components/Input'
import Button from '../../components/Button'
import PageHeading from '../../components/PageHeading';
import Counter from '../../components/Counter';
import Loader from '../../components/Loader';

const CreateProductPage = ({ history }) => {
    const dispatch = useDispatch()

    // States
    const [uploading, setUploading] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [processor, setProcessor] = useState('')
    const [ram, setRam] = useState('')
    const [vga, setVga] = useState('')
    const [resolution, setResolution] = useState('')
    const [hdd, setHdd] = useState('')
    const [ssd, setSsd] = useState('')

    // Selectors
    const { success: successCreate } = useSelector(state => state.productCreate)

    const handleCreate = () => {
        dispatch(createProduct({
            brand, image, model, price, countInStock, processor, ram, vga, resolution,
            hdd: hdd.length !== 0 ? hdd : null,
            ssd: ssd.length !== 0 ? ssd : null
        }))
    }

    const handleUploadImage = async (e) => {
        // Create new form data
        const formData = new FormData()
        formData.append('product', e.target.files[0])

        // Send the request
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            // Stop Loader
            setUploading(false)
        } catch (e) {
            console.error(e)
            setUploading(false)
        }
    }


    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            history.push('/admin/products')
        }
    }, [successCreate, dispatch, history])

    return (
        <>
            <div className="col-md-8 m-auto pt-4">
                <PageHeading>Create Product</PageHeading>

                {/* Inputs */}
                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Image</label>
                    </Col>

                    <Col>
                        <Input
                            placeholder="Image url"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                        <Form.Group>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={handleUploadImage}
                            />
                            {uploading && <Loader circular />}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Count in Stock</label>
                    </Col>

                    <Col>
                        <Counter
                            zero
                            className="my-2"
                            count={countInStock}
                            setCount={setCountInStock}
                        />
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Brand</label>
                    </Col>

                    <Col>
                        <select className='w-100 my-2 py-2' value={brand} onChange={e => setBrand(e.target.value)}>
                            <option value='Select Brand'>Select Brand</option>
                            <option value='Dell'>Dell</option>
                            <option value='Lenovo'>Lenovo</option>
                            <option value='HP'>HP</option>
                            <option value='Acer'>Acer</option>
                            <option value='MSI'>MSI</option>
                        </select>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Model</label>
                    </Col>

                    <Col>
                        <Input
                            placeholder="Model"
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Price (EGP)</label>
                    </Col>

                    <Col>
                        <Input
                            placeholder="Price"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
                        />
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Processor</label>
                    </Col>

                    <Col>
                        <select className='w-100 my-2 py-2' value={processor} onChange={e => setProcessor(e.target.value)}>
                            <option value='Select Processor'>Select Processor</option>
                            <option value='Intel® Core™i3'>Intel® Core™i3</option>
                            <option value='Intel® Core™i5'>Intel® Core™i5</option>
                            <option value='Intel® Core™i7'>Intel® Core™i7</option>
                            <option value='MD Ryzen™'>AMD Ryzen™</option>
                            <option value='AMD Athlon™'>AMD Athlon™</option>
                        </select>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Ram</label>
                    </Col>

                    <Col>
                        <select className='w-100 my-2 py-2' value={ram} onChange={e => setRam(e.target.value)}>
                            <option value='Select RAM'>Select RAM</option>
                            <option value='4GB'>4GB</option>
                            <option value='8GB'>8GB</option>
                            <option value='16GB'>16GB</option>
                            <option value='32GB'>32GB</option>
                        </select>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>VGA</label>
                    </Col>

                    <Col>
                        <select className='w-100 my-2 py-2' value={vga} onChange={e => setVga(e.target.value)}>
                            <option value='Select VGA'>Select VGA</option>
                            <option value='Intel® Hd Graphics'>Intel® Hd Graphics</option>
                            <option value='NVIDIA® GeForce®'>NVIDIA® GeForce®</option>
                            <option value='AMD Radeon™'>AMD Radeon™</option>
                        </select>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Resolution</label>
                    </Col>

                    <Col>
                        <select className='w-100 my-2 py-2' value={resolution} onChange={e => setResolution(e.target.value)}>
                            <option value='Select Resolution'>Select Resolution</option>
                            <option value='HD 1366x768'>HD 1366x768</option>
                            <option value='FHD 1920x1080'>FHD 1920x1080</option>
                        </select>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center">
                    <Col xs={4}>
                        <label>Storage</label>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={6}>
                                <select className='w-100 my-2 py-2' value={hdd} onChange={e => e.target.value !== "No HDD" ? setHdd(e.target.value) : setHdd('')}>
                                    <option value='No HDD'>No HDD</option>
                                    <option value='500GB'>500GB</option>
                                    <option value='1TB'>1TB</option>
                                    <option value='2TB'>2TB</option>
                                </select>
                            </Col>

                            <Col xs={6}>
                                <select className='w-100 my-2 py-2' value={ssd} onChange={e => e.target.value !== "No SSD" ? setSsd(e.target.value) : setSsd('')}>
                                    <option value='No SSD'>No SSD</option>
                                    <option value='120GB'>120GB</option>
                                    <option value='240GB'>240GB</option>
                                    <option value='360GB'>360GB</option>
                                </select>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Button className='mt-2' onClick={handleCreate}>Create</Button>
            </div>
        </>
    );
}

export default CreateProductPage;