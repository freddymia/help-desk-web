package edimca.ec.com.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import edimca.ec.com.domain.enumeration.Priority;

import edimca.ec.com.domain.enumeration.Status;

/**
 * A Request.
 */
@Entity
@Table(name = "request")
public class Request implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;

    @Column(name = "created")
    private ZonedDateTime created;

    @Column(name = "approved")
    private ZonedDateTime approved;

    @Column(name = "assigned")
    private ZonedDateTime assigned;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties("requests")
    private User technician;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Request name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Request description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Priority getPriority() {
        return priority;
    }

    public Request priority(Priority priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public Request created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getApproved() {
        return approved;
    }

    public Request approved(ZonedDateTime approved) {
        this.approved = approved;
        return this;
    }

    public void setApproved(ZonedDateTime approved) {
        this.approved = approved;
    }

    public ZonedDateTime getAssigned() {
        return assigned;
    }

    public Request assigned(ZonedDateTime assigned) {
        this.assigned = assigned;
        return this;
    }

    public void setAssigned(ZonedDateTime assigned) {
        this.assigned = assigned;
    }

    public Status getStatus() {
        return status;
    }

    public Request status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getTechnician() {
        return technician;
    }

    public Request technician(User user) {
        this.technician = user;
        return this;
    }

    public void setTechnician(User user) {
        this.technician = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Request request = (Request) o;
        if (request.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), request.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Request{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", priority='" + getPriority() + "'" +
            ", created='" + getCreated() + "'" +
            ", approved='" + getApproved() + "'" +
            ", assigned='" + getAssigned() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
