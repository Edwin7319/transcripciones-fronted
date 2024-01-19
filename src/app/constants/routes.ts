export enum ELogSchema {
  AUDIO_RECORDING = 'registro_de_audio',
  RECORDS = 'actas',
  TRANSCRIPTION_FILE = 'archivo_de_transcripción',
}
export const APP_ROUTES = {
  audioRecording: 'private/transcripcion/registro-de-audio/gestion',
  audioRecordingAudit: `private/transcripcion/auditoria/${ELogSchema.AUDIO_RECORDING}`,
  recordsAudit: `private/transcripcion/auditoria/${ELogSchema.RECORDS}`,
  login: `public/login`,
  recoveryPassword: `transcripcion/public/recovery-password`,
  user: `private/transcripcion/gestion-usuarios`,
  handlingAudioRecording: `private/transcripcion/manejo-estados-audio`,
  privatePrefix: '/private',
};
