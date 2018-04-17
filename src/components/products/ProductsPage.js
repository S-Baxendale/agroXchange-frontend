import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ProductsList from './ProductsList'
import { fetchAllProducts, filterProducts } from '../../actions/products'
import Button from 'material-ui/Button'
import Dialog, { DialogContent, DialogContentText, withMobileDialog, } from 'material-ui/Dialog'
import SearchProductForm from './SearchProductForm';
import Tune from '@material-ui/icons/Tune'

const classes = {
  tuneIcon: {
    marginRight: 100,
  },
}

class ProductsPage extends PureComponent {
  state = {
    open: false,
  }

  componentWillMount(props) {
    this.props.fetchAllProducts()
  }

 
  submit = (preferences) => {
    this.props.filterProducts(preferences)
   
    this.setState({ open: false })
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
 


  render() {
      const { fullScreen, products, currentUserRole } = this.props
    if (!products) return null

    return(
      <div>

        <Button
          onClick={this.handleClickOpen}
          variant="raised"
        >
        <Tune className={classes.tuneIcon}/>
      
          Filter
        </Button>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          aria-labelledby="responsive-dialog-title"
        >

          <DialogContent>
            <DialogContentText>
              <SearchProductForm onSubmit = {this.submit}/>
            </DialogContentText>
          </DialogContent>

          </Dialog>




        <ProductsList products={ products } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    products: state.products
  }
}

export default connect(mapStateToProps, { fetchAllProducts, filterProducts })(ProductsPage)
