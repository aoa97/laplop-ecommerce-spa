import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap'
import { IconButton } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import { Modal } from 'antd'

import { getProducts, deleteProduct } from '../../actions/productActions';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import PageHeading from '../../components/PageHeading';
import renderStorage from '../../utils/renderStorage';
import Paginate from '../../components/Paginate';

const ProductListPage = ({ history, match }) => {
    const dispatch = useDispatch()
    const pageNumber = match.params.pageNumber || 1
    const { loading, error, products, pages, page } = useSelector(state => state.productList)
    const { success: successDelete } = useSelector(state => state.productDelete)
    const { user } = useSelector(state => state.userLogin)
    const [specs, setSpecs] = useState({ storage: {} })
    const [specsModal, setSpecsModal] = useState(false)

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProduct(id))
        }
    }

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getProducts('', pageNumber))
        } else {
            history.push('/login')
        }
    }, [dispatch, history, user, successDelete, pageNumber])

    return (
        <>
            <Row>
                <Col>
                    <PageHeading>Products</PageHeading>
                </Col>

                <Col className='text-right'>
                    <Link to='/admin/products/new'>Create Product</Link>
                </Col>
            </Row>

            { loading ? <Loader /> : error ? <Message severity='error'>{error}</Message> : (
                <>
                    {products.length === 0 ? (
                        <Message>
                            Your Product List is Empty
                            <Link to="/" className="ml-2">Go Back</Link>
                        </Message>
                    ) : (
                            <>
                                {/* Product's Specs Modal */}
                                <Modal
                                    title="Product Specs"
                                    visible={specsModal}
                                    footer={null}
                                    onCancel={() => setSpecsModal(false)}
                                >
                                    <Row>
                                        <Col>Processor</Col>
                                        <Col>{specs.processor}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Ram</Col>
                                        <Col>{specs.ram}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Storage</Col>
                                        <Col>{renderStorage(specs.storage)}</Col>
                                    </Row>
                                    <Row>
                                        <Col>VGA</Col>
                                        <Col>{specs.vga}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Resolution</Col>
                                        <Col>{specs.resolution}</Col>
                                    </Row>
                                </Modal>

                                <Table striped responsive hover bordered className="table-sm">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Stock</th>
                                            <th>Model</th>
                                            <th>Brand</th>
                                            <th>Price</th>
                                            <th>Specs</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {products.map(product => (
                                            <tr key={product._id}>
                                                <td>{product._id}</td>
                                                <td>{product.countInStock}</td>
                                                <td>{product.model}</td>
                                                <td>{product.brand}</td>
                                                <td>{product.price} EGP</td>
                                                <td>
                                                    <Button variant="text" onClick={() => {
                                                        setSpecsModal(true)
                                                        setSpecs(product.specs)
                                                    }}>Specs</Button>
                                                </td>

                                                {/* Buttons */}
                                                <td className="d-flex justify-content-between">
                                                    <IconButton size="small" onClick={() => history.push(`/admin/product/${product._id}/edit`)}>
                                                        <Edit color="primary" />
                                                    </IconButton>

                                                    <div className="vl"></div>

                                                    <IconButton size="small" onClick={() => handleDelete(product._id)}>
                                                        <Delete color="error" />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <Paginate admin pages={pages} page={page} />
                            </>
                        )}
                </>
            )}
        </>
    );
}

export default ProductListPage;