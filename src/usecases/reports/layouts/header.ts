import { Column } from 'pdfmake/interfaces'
import { Administrator } from '../../../entities/Administrator'

const HeadersReport = (company: Administrator, classImage:string, styleHeader: string):Column[] => {
   return [
    { image: classImage,  width: 120},
          {
            ol: [
            `Razão social:  ${company.razao}`,
            `Fantasia: ${company.fantasia}`,
            `CPF/CNPJ:  ${company.cpf_cnpj}` + "  " +`Insc. estadual:  ${company.insc_estadual}`,
            `Endereço:  ${company.endereco}, ${company.numero}, ${company.bairro}`,
            `Cidade/UF:  ${company.cidade}-${company.uf}`,
            `Telefone:  ${company.telefone}` + "  " + `E-mail:  ${company.email}`,
          ],
          type: 'none',
          style: styleHeader
        }
  ]
}

export default HeadersReport