import React from 'react'
import { Table } from 'semantic-ui-react'

const CategorieItems = ({username}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Categorie</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>Percentage van Totaal</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Werven vrijwilligers</Table.Cell>
        <Table.Cell textAlign='right'>10.1 %</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Medewerkers trainen op positieve houding</Table.Cell>
        <Table.Cell textAlign='right'>17.7 %</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Pauze</Table.Cell>
        <Table.Cell textAlign='right'>6.3 %</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Proces samen een probleem oplossen verbeteren</Table.Cell>
        <Table.Cell textAlign='right'>13.9 %</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Uitbreiden dagbestedingsactiviteiten</Table.Cell>
        <Table.Cell textAlign='right'>10.1 %</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Werkvloeren</Table.Cell>
        <Table.Cell textAlign='right'>21.5 %</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Overig (geen doel in Hoshin)</Table.Cell>
        <Table.Cell textAlign='right'>20.3 %</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell textAlign='right'>Totaal</Table.HeaderCell>
        <Table.HeaderCell textAlign='right'>100 %</Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default CategorieItems