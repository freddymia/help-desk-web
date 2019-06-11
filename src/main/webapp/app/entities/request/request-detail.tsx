import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RequestDetail extends React.Component<IRequestDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { requestEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="edimcaApp.request.detail.title">Request</Translate> [<b>{requestEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="edimcaApp.request.name">Name</Translate>
              </span>
            </dt>
            <dd>{requestEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="edimcaApp.request.description">Description</Translate>
              </span>
            </dt>
            <dd>{requestEntity.description}</dd>
            <dt>
              <span id="priority">
                <Translate contentKey="edimcaApp.request.priority">Priority</Translate>
              </span>
            </dt>
            <dd>{requestEntity.priority}</dd>
            <dt>
              <span id="created">
                <Translate contentKey="edimcaApp.request.created">Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.created} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="approved">
                <Translate contentKey="edimcaApp.request.approved">Approved</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.approved} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="assigned">
                <Translate contentKey="edimcaApp.request.assigned">Assigned</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={requestEntity.assigned} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="edimcaApp.request.status">Status</Translate>
              </span>
            </dt>
            <dd>{requestEntity.status}</dd>
            <dt>
              <Translate contentKey="edimcaApp.request.technician">Technician</Translate>
            </dt>
            <dd>{requestEntity.technician ? requestEntity.technician.firstName + ' ' + requestEntity.technician.lastName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/request" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ request }: IRootState) => ({
  requestEntity: request.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestDetail);
