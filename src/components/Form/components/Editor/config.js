import UploadAdapter from '../../../../adapters/UploadAdapter';

function CustomUploadAdapterPlugin(editor){
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
      return new UploadAdapter(loader)
    }
}

const config = {
  extraPulgins: [ CustomUploadAdapterPlugin ],
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'alignment',
      '|',
      'blockQuote',
      'insertTable',
      '|',
      'imageUpload',
      'imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:side',
      'imageTextAlternative',
      '|',
      'undo',
      'redo'
    ]
  },
  image: {
    styles: [
      'side',
      'full',
      'alignLeft',
      'alignRight'
    ],
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      'imageStyle:side',
      '|',
      'imageTextAlternative'
    ]
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],   
  },
}

export default config;