import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRequestUpdateState {
  isNew: boolean;
  technicianId: string;
}

export class RequestUpdate extends React.Component<IRequestUpdateProps, IRequestUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      technicianId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.created = convertDateTimeToServer(values.created);
    values.approved = convertDateTimeToServer(values.approved);
    values.assigned = convertDateTimeToServer(values.assigned);

    if (errors.length === 0) {
      const { requestEntity } = this.props;
      const entity = {
        ...requestEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/request');
  };

  render() {
    const { requestEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="edimcaApp.request.home.createOrEditLabel">
              <Translate contentKey="edimcaApp.request.home.createOrEditLabel">Create or edit a Request</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : requestEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="request-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="edimcaApp.request.name">Name</Translate>
                  </Label>
                  <AvField id="request-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="edimcaApp.request.description">Description</Translate>
                  </Label>
                  <AvField id="request-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="priorityLabel">
                    <Translate contentKey="edimcaApp.request.priority">Priority</Translate>
                  </Label>
                  <AvInput
                    id="request-priority"
                    type="select"
                    className="form-control"
                    name="priority"
                    value={(!isNew && requestEntity.priority) || 'High'}
                  >
                    <option value="High">
                      <Translate contentKey="edimcaApp.Priority.High" />
                    </option>
                    <option value="Normal">
                      <Translate contentKey="edimcaApp.Priority.Normal" />
                    </option>
                    <option value="Low">
                      <Translate contentKey="edimcaApp.Priority.Low" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="createdLabel" for="created">
                    <Translate contentKey="edimcaApp.request.created">Created</Translate>
                  </Label>
                  <AvInput
                    id="request-created"
                    type="datetime-local"
                    className="form-control"
                    name="created"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.created)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="approvedLabel" for="approved">
                    <Translate contentKey="edimcaApp.request.approved">Approved</Translate>
                  </Label>
                  <AvInput
                    id="request-approved"
                    type="datetime-local"
                    className="form-control"
                    name="approved"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.approved)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="assignedLabel" for="assigned">
                    <Translate contentKey="edimcaApp.request.assigned">Assigned</Translate>
                  </Label>
                  <AvInput
                    id="request-assigned"
                    type="datetime-local"
                    className="form-control"
                    name="assigned"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.requestEntity.assigned)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="edimcaApp.request.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="request-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && requestEntity.status) || 'Pending'}
                  >
                    <option value="Pending">
                      <Translate contentKey="edimcaApp.Status.Pending" />
                    </option>
                    <option value="Approved">
                      <Translate contentKey="edimcaApp.Status.Approved" />
                    </option>
                    <option value="Assigned">
                      <Translate contentKey="edimcaApp.Status.Assigned" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="technician.id">
                    <Translate contentKey="edimcaApp.request.technician">Technician</Translate>
                  </Label>
                  <AvInput id="request-technician" type="select" className="form-control" name="technician.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/request" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  requestEntity: storeState.request.entity,
  loading: storeState.request.loading,
  updating: storeState.request.updating,
  updateSuccess: storeState.request.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestUpdate);
