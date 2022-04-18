import React, { useEffect, useState, Fragment } from 'react'
import { gql, useMutation } from '@apollo/client'
import Alert from '@material-ui/lab/Alert'
import { 
	Button,
	IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function UploadFile({ name, inputRef, value, mediaData, handleOnChange, callback, errors }) {
	const [uploadErrors, setUploadErrors] = useState(errors);
	const [mediaId, setMediaId] = useState(value)
	const [mediaInfo, setMediaInfo] = useState(mediaData)
	const [changeFile, setChangeFile] = useState(false)

	const UPLOAD = gql`
		mutation($file: Upload!) {
			addMedia(file: $file) {
				id,
				path,
				filename, 
				filename_original,
				mimetype
			}
		}
	`

	const [mutate, { loading, error }] = useMutation(UPLOAD, {
		onCompleted: (data) => {
			// callback({ success: true, ...data.addMedia })
			setMediaId(data.addMedia.id)
			setMediaInfo(data.addMedia)
			setChangeFile(!changeFile)
			handleOnChange(data.addMedia.id)
		},
		onError: (error) => {
			console.log(error)
		}
	});
	
	const onChange = ({
		target: {
			validity,
			files: [file]
		}
	}) => {
		if(file && file.size > 5242880){
			let dataErrors = {...uploadErrors }
			dataErrors[name] = {
				message: `Arquivo ${file.name} ultrapassou o tamanho máximo de 5MB permitido`
			};
			setUploadErrors(dataErrors)
		} else {
			if(validity.valid)
				mutate({ variables: { file } })
		}
	};

	useEffect(() => {
		if(value && mediaData) {
			setMediaId(value)
			setMediaInfo(mediaData)
			setChangeFile(true)
		}
	}, [value, mediaData]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

	return (
		<Fragment>
			{ !mediaId && !mediaInfo ? (
				<input 
					type="file" 
					onChange={onChange}
					className="btn-upload" />
			) : (
				<div>
					{!changeFile ? (
						<input 
							type="file" 
							onChange={onChange}
							className="btn-upload" /> 
					) : (
						<strong>{mediaInfo.filename_original}</strong>
					)}
					{changeFile && (
						<Button 
							onClick={() => {
								setMediaId(0)
								setMediaInfo(null)
								setChangeFile(!changeFile)
								handleOnChange(0)
							}}
						>
							Alterar
						</Button>
					)}
				</div>
			)}

			{uploadErrors && uploadErrors[name] && (
				<Alert
					variant="outlined" 
					severity="error"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					{uploadErrors[name].message}
				</Alert>
			)}
			
			<input 
				type="hidden" 
				ref={inputRef}
				name={name} 
				value={mediaId} />
		</Fragment>
	)
}