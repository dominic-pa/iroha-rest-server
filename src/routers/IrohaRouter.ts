import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import AssetsController from '../controllers/AssetController';
import DomainController from '../controllers/DomainController';
import GrantablePermissionController from '../controllers/GrantablePermissionController';
import MiscQueriesController from '../controllers/MiscQueriesController';
import PeerController from '../controllers/PeerController';
import RoleController from '../controllers/RoleController';
import SignatoryController from '../controllers/SignatoryController';
import TransactionsController from '../controllers/TransactionsController';
//import BatchTransactionController from '../controllers/BatchTransactionController';

class IrohaRouter {
  private _IrohaRouter = Router();

  private _AccountController = AccountController;
  private _AssetController = AssetsController;
  private _DomainController = DomainController;
  private _GrantablePermissionController = GrantablePermissionController;
  private _MiscQueriesController = MiscQueriesController;
  private _PeerController = PeerController;
  private _RoleController = RoleController;
  private _SignatoryController = SignatoryController;
  private _TransactionsController = TransactionsController;
  //private _BatchTransactionController = BatchTransactionController;

  get router() {
    return this._IrohaRouter;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controllers.
   */
  private _configure() {
    this._IrohaRouter.use('/account',this._AccountController);
    this._IrohaRouter.use('/asset',this._AssetController);
    this._IrohaRouter.use('/domain',this._DomainController);
    this._IrohaRouter.use('/grantableperm',this._GrantablePermissionController);
    this._IrohaRouter.use('/misc',this._MiscQueriesController);
    this._IrohaRouter.use('/peer',this._PeerController);
    this._IrohaRouter.use('/role',this._RoleController);
    this._IrohaRouter.use('/signatory',this._SignatoryController);
    this._IrohaRouter.use('/transactions',this._TransactionsController);
    //this._IrohaRouter.use('/batch',this._BatchTransactionController);
  }
}

export = new IrohaRouter().router;