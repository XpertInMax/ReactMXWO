import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'reactstrap'
import { useFormik, FormikProvider } from 'formik'
import * as Yup from 'yup';
import FormTextField from '../../components/Form/TextField';
import FormTextArea from '../../components/Form/TextArea';
import FormSelect from '../../components/Form/Select';
import FormRadioField from '../../components/Form/Radio';
import { siteIds, workOrderTypes, woPriority } from '../../mockdata';
import WorkOrderService from '../../services/workOrderService'
import AlertModal from '../../components/Modal';
import Loader from '../../components/Loader';

type WorkOrderProps = {
    data?: any
    saveOrgUser?: (data: any, isEditModal: boolean) => void
}

const WorkOrderForm: React.FC<WorkOrderProps> = () => {

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [assetOptions, setAssetOptions] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

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

    const toggleModal = (open = true, title: string, content: any) => {
        setShowModal(open)
        setModalTitle(title)
        setModalContent(content)
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
            const { workdesc, workOrderType, site, asset, priority } = values;
            const payload = {
                "assetnum": asset,
                "description_longdescription": workdesc,
                "description": workdesc,
                "worktype": workOrderType,
                "status": "WAITASGN",
                "siteid": site,
                "orgid": "GAF",
                "sourcesysid": "AUGURY",
                "wopriority": priority,
            };
            // submit work order
            saveWorkOrder(payload);
        },
    })


    const saveWorkOrder = (payload: any) => {
        setShowLoader(true);
        const workOrderService = new WorkOrderService();
        workOrderService.saveWorkOrder(payload)
            .then((response: any) => {
                setShowLoader(false);
                const { status, statusText, data } = response;
                if (status === 201) {
                    const { assetnum, workorderid, wonum, siteid, woactivity_collectionref } = data;
                    const url = `https://maximodev-azr.gaf.com/maximo/ui/maximo.jsp?event=loadapp&value=wotrack&uniqueid=${workorderid}`;
                    const title = `<p class='success-text'>Work Order Created Successfully</p>`;
                    const content = `<div><p>Work Order Details:</p>
                        <ul style={{listType:'none'}}>
                        <li>Work Order#: ${wonum}</li>
                        <li>Site: ${siteid}</li>
                        <li>Asset Number: ${assetnum} </li> </ul>
                        <a href=${url} target='_blank'>Take me to Maximo Work Order</a>
                    </div>`;
                    toggleModal(true, title, content);
                    formik.resetForm();
                } else {
                    const { message } = data.Error;
                    const title = `<p class='red-text'>Work Order Creation Failed</p>`;
                    const content = `<div><p>Report Error to Administrator if needed.</p><p class='red-text'>${message}</p></div>`;
                    toggleModal(true, title, content);
                }
            })
            .catch((error: any) => {
                setShowLoader(false);
                console.log(error)
            });
    };

    const getAssetsForSelectedSite = (siteId: any) => {
        setShowLoader(true);
        const workOrderService = new WorkOrderService();
        workOrderService.getAssetsBySiteId(siteId)
            .then((response: any) => {
                console.log(response)
                setShowLoader(false);
                const {member} = response.data;
                if (member) {
                    const assets = member?.map((asset:any) => ({
                        label: `${asset.assetnum } : ${asset.description}`, value: asset.assetnum
                    }))
                    setAssetOptions(assets);
                } else {
                    setAssetOptions([]);
                }
            })
            .catch((error: any) => {
                setShowLoader(false);
                console.log(error)
                setAssetOptions([]);
            });
    }


    return (
        <div>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Enter Work Order Information</h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <FormSelect
                                        name='site'
                                        options={siteIds}
                                        onChangeHandler={(e) => {
                                            formik.setFieldValue('asset', '')
                                            getAssetsForSelectedSite(e)
                                        }}
                                        label='Site Id'
                                        placeholder='Select Site'
                                        disabled={false}
                                        required
                                        id='site'
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <FormRadioField
                                        name='downtime'
                                        label='Downtime Required'
                                        placeholder='Is downtime required'
                                        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
                                        disabled={false}
                                        // required
                                        id='downtime'
                                        value={formik.values.downtime}
                                    //    onChangeHandler={(value) => formik.setValues({downtime: value})}
                                    // disabled={isEditModal}
                                    />
                                </div>
                                <div className="sm:col-span-6">
                                    <FormSelect
                                        name='asset'
                                        options={assetOptions}
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
                                    <FormSelect
                                        name='priority'
                                        options={woPriority}
                                        label='Work Order Priority'
                                        placeholder='Select Work Order Priority'
                                        disabled={false}
                                        required
                                        id='priority'
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <FormTextField
                                        name='firstName'
                                        label='Reported By'
                                        placeholder='Enter User ID'
                                        disabled={false}
                                        // required
                                        // disabled={isEditModal}
                                        id='firstName'
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <FormTextField
                                        name='lastName'
                                        label='Full Name'
                                        placeholder='Enter Your Full Name'
                                        disabled={false}
                                        // required
                                        id='lastName'
                                    // disabled={isEditModal}
                                    />
                                </div>
                                <div className="sm:col-span-6">
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
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => formik.resetForm()}>Reset</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit Work Order</button>
                    </div>
                </Form>
                {showModal && <AlertModal show={showModal} title={modalTitle} content={modalContent} closeModal={() => toggleModal(false, '', '')} />}
                
            {!showLoader && <Loader />}
            </FormikProvider>


        </div>
    )
}

export default WorkOrderForm;