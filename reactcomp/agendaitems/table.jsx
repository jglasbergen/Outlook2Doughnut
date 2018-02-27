import React from 'react'
import { Table } from 'semantic-ui-react'

const AgendaItems = ({username}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Agenda Item</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>Begintijd</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>Eindtijd</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Bespreek casus X inzake positieve houding</Table.Cell>
        <Table.Cell textAlign='right'>11:30</Table.Cell>
        <Table.Cell textAlign='right'>14:00</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Bespreek feedback inwoners en familie</Table.Cell>
        <Table.Cell textAlign='right'>09:00</Table.Cell>
        <Table.Cell textAlign='right'>11:00</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Coach medewerker y</Table.Cell>
        <Table.Cell textAlign='right'>15:30</Table.Cell>
        <Table.Cell textAlign='right'>17:00</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>{username}</Table.HeaderCell>
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default AgendaItems