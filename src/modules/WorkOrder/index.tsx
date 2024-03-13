import React, { useEffect } from 'react'
import { Form, Button, Row, Col } from 'reactstrap'
import { useFormik, FormikProvider } from 'formik'
import * as Yup from 'yup';
import FormTextField from '../../components/Form/TextField';
import FormTextArea from '../../components/Form/TextArea';
import FormNumberField from '../../components/Form/NumberField';
import FormSelect from '../../components/Form/Select';
import FormRadioField from '../../components/Form/Radio';
import {siteIds, workOrderTypes, assets} from '../../mockdata';
import WorkOrderService from '../../services/workOrderService'

type WorkOrderProps = {
    data?: any
    saveOrgUser?: (data: any, isEditModal: boolean) => void
}

const WorkOrderForm: React.FC<WorkOrderProps> = () => {

    const validationSchema = Yup.object().shape({
        // firstName: Yup.string().trim().required('Please enter first name'),
        // lastName: Yup.string()
        //     .nullable()
        //     .trim()
        //     .required('Please enter last name'),
        site: Yup.string().nullable().required('Please select site'),
        priority: Yup.number().nullable().required('Please select priority'),
        asset: Yup.string().nullable().required('Please select Machine/Asset'),
        workOrderType: Yup.string().nullable().required('Please select work order type'),
    //    downtime: Yup.string().nullable().required('Please select downtime'),
        workdesc: Yup.string().nullable().trim().required('Please enter work description'),
    })

    const saveWorkOrder = async (data:any) => {
        await saveWorkOrder(data);
    };

    const formik = useFormik<any>({
        initialValues: {
            firstName: '',
            lastName: '',
            site: '',
            priority: '',
            asset: '',
            workOrderType: '',
            downtime: '',
            workdesc: ''
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            const {workdesc, workOrderType, site, asset, priority} = values;
            const payload = {
                "assetnum": asset,
                "description_longdescription": workdesc,
              //  "description": "Worn/defective belts or sheaves detected. - motor, Worn/defective belts or sheaves detected. - driven_pump",
                "worktype": workOrderType,
                "status": "WAITASGN",
                "siteid": site,
                "orgid": "GAF",
                "sourcesysid": "AUGURY",
                "wopriority": priority,
            };
            
            const workOrderService = new WorkOrderService();
            const req = await workOrderService.saveWorkOrder(payload)
        },
    })

    useEffect(() => {

    }, [])

    return (
        // <div className=''>
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Work Order Information</h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <FormSelect
                                    name='site'
                                    options={siteIds}
                                    label='Site Id'
                                    placeholder='Select site'
                                    disabled={false}
                                    required
                                    id='site'
                                />
                            </div>
                            <div className="sm:col-span-3"></div>
                            <div className="sm:col-span-3">
                                <FormTextField
                                    name='firstName'
                                    label='First Name'
                                    placeholder='Enter first Name'
                                    disabled={false}
                                    // required
                                    // disabled={isEditModal}
                                    id='firstName'
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <FormTextField
                                    name='lastName'
                                    label='Last Name'
                                    placeholder='Enter last Name'
                                    disabled={false}
                                    // required
                                    id='lastName'
                                    // disabled={isEditModal}
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <FormSelect
                                    name='asset'
                                    options={assets}
                                    label='Machine/Asset Id'
                                    placeholder='Select Machine/Asset'
                                    disabled={false}
                                    required
                                    id='asset'
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <FormSelect
                                    name='workOrderType'
                                    options={workOrderTypes}
                                    label='Work Order Type'
                                    placeholder='Select Work Order Type'
                                    disabled={false}
                                    required
                                    id='workOrderType'
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <FormNumberField
                                    name='priority'
                                    label='Priority'
                                    placeholder='Enter priority'
                                    disabled={false}
                                    required
                                    id='priority'
                                    min={1}
                                    max={5}
                                // disabled={isEditModal}
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <FormRadioField
                                    name='downtime'
                                    label='Downtime required'
                                    placeholder='Select downtime required'
                                    options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                                    disabled={false}
                                    // required
                                    id='downtime'
                                    value={formik.values.downtime}
                                //    onChangeHandler={(value) => formik.setValues({downtime: value})}
                                // disabled={isEditModal}
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <FormTextArea
                                    name='workdesc'
                                    label='Describe the work that needs to be done'
                                    placeholder='Enter work details'
                                    disabled={false}
                                    required
                                    id='workdesc'
                                // disabled={isEditModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='addVenue-buttonwrapper'>
                        <Button outline color='primary'>
                            Cancel
                        </Button>
                        <Button type='submit' color='primary'>
                            Save
                        </Button>
                    </div> */}
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit Work Order</button>
                </div>
            </Form>
        </FormikProvider>
        // </div>
    )
}

export default WorkOrderForm;