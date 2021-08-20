import { BookOutlined } from '@ant-design/icons'
import Slider from '@material-ui/core/Slider'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { Checkbox, Menu } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../actions/categoryAction'
import {
   filterPriceProduct,
   filterProduct,
   filterSubProduct,
} from '../actions/productActions'
import { listSubCategory } from '../actions/subCategoryAction'
import {
   PRODUCT_FILTER_PRICE_RESET,
   PRODUCT_FILTER_RESET,
   PRODUCT_FILTER_SUB_RESET,
   PRODUCT_OF_CATEGORY_RESET,
   PRODUCT_OF_SUB_CATEGORY_RESET,
} from '../constants/productConstants'

const { SubMenu } = Menu

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const useStyles = makeStyles({
   root: {
      width: 300,
   },
})

const PrettoSlider = withStyles({
   root: {
      color: '#52af77',
      height: 8,
   },
   thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
         boxShadow: 'inherit',
      },
   },
   active: {},
   valueLabel: {
      left: 'calc(-50% + 4px)',
   },
   track: {
      height: 8,
      borderRadius: 4,
   },
   rail: {
      height: 8,
      borderRadius: 4,
   },
})(Slider)

function valuetext(value) {
   return `${value}`
}

const FilterNav = () => {
   const classes = useStyles()
   const [value, setValue] = useState([0, 5000000])
   const [cat, setCat] = useState([])
   const [sub, setSub] = useState([])
   const [start, setStart] = useState('')
   const [end, setEnd] = useState('')
   const [openKeys, setOpenKeys] = React.useState(['sub1', 'sub2'])

   const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
         setOpenKeys(keys)
      } else {
         setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
      }
   }
   function ValueLabelComponent(props) {
      const { children, open, value } = props

      props.index === 1 ? setEnd(props.value) : setStart(props.value)

      return (
         <Tooltip
            open={open}
            enterTouchDelay={0}
            placement='bottom'
            title={value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
         >
            {children}
         </Tooltip>
      )
   }

   // console.log('end', end)
   // console.log('start', start)

   ValueLabelComponent.propTypes = {
      children: PropTypes.element.isRequired,
      open: PropTypes.bool.isRequired,
      value: PropTypes.number.isRequired,
   }

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   const categoriesList = useSelector((state) => state.categoriesList)
   const { category } = categoriesList

   const subCategoryList = useSelector((state) => state.subCategoryList)
   const { Sub } = subCategoryList

   const productFilterPrice = useSelector((state) => state.productFilterPrice)
   const { product: productsFilterPrice } = productFilterPrice

   const dispatch = useDispatch()

   function onChange(checkedValues) {
      if (checkedValues.target.checked === true) {
         setCat([...cat, checkedValues.target.value])
         setSub([])
      } else {
         cat.map(
            (e) =>
               e === checkedValues.target.value && cat.splice(cat.indexOf(e), 1)
         )
         setCat([...cat])
      }
   }

   function onChange2(checkedValues) {
      if (checkedValues.target.checked === true) {
         setSub([...sub, checkedValues.target.value])
         setCat([])
      } else {
         sub.map(
            (e) =>
               e === checkedValues.target.value && sub.splice(sub.indexOf(e), 1)
         )
         setSub([...sub])
      }
   }

   const submitHandler = (e) => {
      e.preventDefault()
      if ((cat.length === 0) & (sub.length === 0)) {
         dispatch({ type: PRODUCT_FILTER_RESET })
         dispatch({ type: PRODUCT_FILTER_SUB_RESET })
         dispatch({ type: PRODUCT_OF_SUB_CATEGORY_RESET }) 
         dispatch({ type: PRODUCT_OF_CATEGORY_RESET })
         dispatch(filterPriceProduct([start, end]))
      } else if (sub.length === 0) {
         dispatch({ type: PRODUCT_FILTER_SUB_RESET })
         dispatch({ type: PRODUCT_FILTER_PRICE_RESET })
         dispatch({ type: PRODUCT_OF_SUB_CATEGORY_RESET })
         dispatch({ type: PRODUCT_OF_CATEGORY_RESET })

         dispatch(filterProduct(cat))
      } else if (cat.length === 0) {
         dispatch({ type: PRODUCT_FILTER_PRICE_RESET })
         dispatch({ type: PRODUCT_OF_SUB_CATEGORY_RESET })
         dispatch({ type: PRODUCT_OF_CATEGORY_RESET })
         dispatch({ type: PRODUCT_FILTER_RESET })
         dispatch(filterSubProduct(sub))
      }
   }

   useEffect(() => {
      dispatch(listCategories())
      dispatch(listSubCategory())
   }, [dispatch])

   return (
      <>
         <Form onSubmit={submitHandler}>
            <div className='m-3 mb-0'>
               <h5 className='justify-content-center mt-2 d-flex align-items-center'>
                  <Image
                     className='mr-2'
                     src='https://img.icons8.com/material-outlined/20/000000/filter--v1.png'
                  />
                  Bộ lọc tìm kiếm
               </h5>

               <Form.Group>
                  <strong className='mb-1 justify-content-center d-flex align-items-center mt-3 '>
                     <Image
                        className='pl-1 pr-1'
                        src='https://img.icons8.com/fluent/24/000000/us-dollar.png'
                     />
                     Tìm kiếm theo giá
                  </strong>
                  <div className='d-flex align-items-center justify-content-center mb-1'>
                     <p className='pr-1 mb-0'> Giá từ:</p>
                     <strong
                        className='mb-0'
                        style={{ letterSpacing: '0.08rem' }}
                     >
                        {start
                           .toString()
                           .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ'}
                        {
                           <Image
                              className='pl-1 pr-1'
                              src='https://img.icons8.com/fluent/24/000000/resize-horizontal.png'
                           />
                        }
                        {end.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
                           'đ'}
                     </strong>
                  </div>
                  <PrettoSlider
                     value={value}
                     onChange={handleChange}
                     ValueLabelComponent={ValueLabelComponent}
                     aria-labelledby='range-slider'
                     getAriaValueText={valuetext}
                     valueLabelDisplay='auto'
                     aria-label='pretto slider'
                     min={0}
                     step={50000}
                     max={5000000}
                  />
               </Form.Group>

               <Form.Group>
                  <Menu
                     mode='inline'
                     openKeys={openKeys}
                     onOpenChange={onOpenChange}
                     style={{ width: 270 }}
                     className='border-0'
                  >
                     <SubMenu
                        key='sub1'
                        icon={<BookOutlined />}
                        title='Tìm kiếm theo danh mục'
                     >
                        {category &&
                           category.map((cate, key) => (
                              <Menu.Item key={key}>
                                 <Checkbox value={cate._id} onChange={onChange}>
                                    {cate.name}
                                 </Checkbox>
                              </Menu.Item>
                           ))}
                     </SubMenu>
                  </Menu>
               </Form.Group>

               <Form.Group>
                  <Menu
                     mode='inline'
                     openKeys={openKeys}
                     onOpenChange={onOpenChange}
                     style={{ width: 270 }}
                     className='border-0'
                  >
                     <SubMenu
                        key='sub2'
                        icon={<BookOutlined />}
                        title='Tìm kiếm theo danh mục con'
                     >
                        {Sub &&
                           Sub.map((cate, key) => (
                              <Menu.Item key={key}>
                                 <Checkbox
                                    value={cate._id}
                                    onChange={onChange2}
                                 >
                                    {cate.name}
                                 </Checkbox>
                              </Menu.Item>
                           ))}
                     </SubMenu>
                  </Menu>
               </Form.Group>
               <Form.Group className='text-center '>
                  <Button
                     type='submit'
                     size='normal'
                     variant='outline-dark rounded-pill p-1 pl-4 pr-4'
                     style={{ letterSpacing: '0.08rem', fontSize: '0.85rem' }}
                  >
                     Tìm kiếm
                  </Button>
               </Form.Group>
            </div>
         </Form>
      </>
   )
}

export default FilterNav
