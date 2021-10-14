import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BackTop } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUserDetails } from './actions/userActions';
import ProtectedRoute from './components/ProtectedRoute';
import AdminScreen from './screens/admin/AdminScreen';
import CategoriesListScreen from './screens/admin/CategoriesListScreen';
import CategoryEditScreen from './screens/admin/CategoryEditScreen';
import CodeEditScreen from './screens/admin/CodeEditScreen';
import CodeListScreen from './screens/admin/CodeListScreen';
import OrderEditScreen from './screens/admin/OrderEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductCreateScreen from './screens/admin/ProductCreateScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import SaleEditScreen from './screens/admin/SaleEditScreen';
import SaleListScreen from './screens/admin/SaleListScreen';
import SubCategoryEditScreen from './screens/admin/SubCategoryEditScreen';
import SubCategoriesListScreen from './screens/admin/SubCategoryListScreen';
import SupplierEditScreen from './screens/admin/SupplierEditScreen';
import SupplierListScreen from './screens/admin/SupplierListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import ListReviewsScreen from './screens/admin/ListReviewsScreen';
import CartScreen from './screens/CartScreen.js';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import OrderScreen from './screens/OrderScreen.js';
import { PaymentScreen } from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductOfCategoryScreen from './screens/ProductOfCategoryScreen';
import ProductScreen from './screens/ProductScreen.js';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import RegisterScreen from './screens/RegisterScreen.js';
import SearchScreen from './screens/SearchScreen';
import { ShippingScreen } from './screens/ShippingScreen';
import UsersAddressListScreen from './screens/UsersAddressListScreen';
import AdminChatScreen from './screens/admin/AdminChatScreen';
import KonmunicateChat from './components/KonChat';

const THEME = createMuiTheme({
   typography: {
      fontFamily: `"Quicksand", "Roboto", "Arial", sans-serif`,
   },
});

const App = () => {
   const dispatch = useDispatch();
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userDetails = useSelector((state) => state.userDetails);
   const { user } = userDetails;

   useEffect(() => {
      if (userInfo) {
         dispatch(getUserDetails(userInfo._id));
      }
   }, [dispatch, userInfo]);

   return (
      <>
         <BackTop />
         {/* {!userInfo?.isAdmin && <KonmunicateChat />} */}
         <Router>
            <div>
               <ThemeProvider theme={THEME}>
                  {/* <Header /> */}

                  <Fragment className="mb-4">
                     <Route path="/" component={HomeScreen} exact />
                     <Route
                        path="/search/:keyword"
                        component={SearchScreen}
                        exact
                     />

                     <div>
                        <Route
                           path="/profile"
                           component={ProfileScreen}
                           exact
                        />

                        <Route path="/cart/:id?" component={CartScreen} exact />

                        <Route
                           path="/product/:id/category"
                           component={ProductOfCategoryScreen}
                           exact
                        />

                        <Route
                           path="/product/:id"
                           component={ProductScreen}
                           exact
                        />

                        <Route path="/chat" component={ChatScreen} exact />

                        <Route
                           path="/order/:id"
                           component={OrderScreen}
                           exact
                        />
                        <Route
                           path="/myorders"
                           component={MyOrdersScreen}
                           exact
                        />
                        <Route
                           path="/register"
                           component={RegisterScreen}
                           exact
                        />
                        <Route
                           path="/shipping"
                           component={ShippingScreen}
                           exact
                        />
                        <Route path="/login" component={LoginScreen} exact />
                        <Route
                           path="/placeorder"
                           component={PlaceOrderScreen}
                           exact
                        />
                        <Route
                           path="/payment"
                           component={PaymentScreen}
                           exact
                        />
                        <Route
                           path="/page/:pageNumber"
                           component={HomeScreen}
                           exact
                        />
                        <Route
                           path="/profile/address"
                           component={UsersAddressListScreen}
                           exact
                        />
                        <Route
                           path="/search/:keyword/page/:pageNumber"
                           component={HomeScreen}
                           exact
                        />
                     </div>

                     <Container>
                        <Route
                           path="/admin/productlist/:pageNumber"
                           component={ProductListScreen}
                           exact
                        />
                     </Container>
                  </Fragment>
                  {/* <Footer /> */}
                  <Route path="/admin" component={AdminScreen} exact />

                  <ProtectedRoute
                     path="/admin/listreviews"
                     isAdmin={true}
                     component={ListReviewsScreen}
                     exact
                  />

                  <ProtectedRoute
                     path="/admin/userlist"
                     isAdmin={true}
                     component={UserListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/categorieslist"
                     component={CategoriesListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/subcategorieslist"
                     component={SubCategoriesListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/productlist"
                     component={ProductListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/product/create"
                     component={ProductCreateScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/supplierlist"
                     component={SupplierListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/codelist"
                     component={CodeListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/orderlist"
                     component={OrderListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/category/:id/edit"
                     component={CategoryEditScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/code/:id/edit"
                     component={CodeEditScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/salelist"
                     component={SaleListScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/subcategory/:id/edit"
                     component={SubCategoryEditScreen}
                     exact
                  />
                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/sale/:id/edit"
                     component={SaleEditScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/order/:id/edit"
                     component={OrderEditScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/chat"
                     component={AdminChatScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/product/:id/edit"
                     component={ProductEditScreen}
                     exact
                  />

                  <ProtectedRoute
                     isAdmin={true}
                     path="/admin/supplier/:id/edit"
                     component={SupplierEditScreen}
                     exact
                  />

                  <Route
                     isAdmin={true}
                     path="/admin/user/:id/edit"
                     component={UserEditScreen}
                     exact
                  />
               </ThemeProvider>
            </div>
         </Router>
      </>
   );
};

export default App;
