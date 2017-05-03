import React from 'react';
import TinyMCE from 'react-tinymce';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionValue: this.props.descriptionValueCreated ? this.props.descriptionValueCreated : null,
    }
  }

  handleChangeEditor(e, fieldName) {
    const { change } = this.props;
    change(fieldName, e.target.getContent());
  }

  render() {
    const { fieldName } = this.props;
    return (
      <TinyMCE
        content={this.state.descriptionValue}
        config={{
          content_style: `.mce-content-body {font - size:18px;font-family:Arial,sans-serif;}`,
          plugins: 'advlist autolink link image charmap lists print preview fullscreen' +
          ' emoticons image imagetools textcolor searchreplace layer',
          menubar: `file edit insert view format`,
          toolbar: 'undo | redo | fontselect | fontsizeselect | forecolor | backcolor | bold | ' +
          'italic | ' + 'alignleft aligncenter alignright | bullist | numlist | outdent | indent ' +
          '| image | preview',
          font_formats: 'Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; ' +
          'Comic Sans MS=comic sans ms,sans-serif; Tahoma=tahoma,arial,helvetica,sans-serif; ' +
          'Times New Roman=times new roman,times; Helvetica=helvetica; ' +
          'Wingdings=wingdings,zapf dingbats',
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt 56pt',
          fullpage_default_fontsize: '18p',
          height: 300,
          elementpath: false,
        }}
        onChange={e => this.handleChangeEditor(e, fieldName)}
      />
    );
  }
}
