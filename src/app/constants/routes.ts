export enum ELogSchema {
  AUDIO_RECORDING = 'registro_de_audio',
  RECORDS = 'actas',
  TRANSCRIPTION_FILE = 'archivo_de_transcripción',
}
export const APP_ROUTES = {
  home: 'transcripcion/inicio',
  audioRecording: 'transcripcion/registro-de-audio/gestion',
  audioRecordingAudit: `transcripcion/private/auditoria/${ELogSchema.AUDIO_RECORDING}`,
  recordsAudit: `transcripcion/private/auditoria/${ELogSchema.RECORDS}`,
  login: `transcripcion/public/login`,
  recoveryPassword: `transcripcion/public/recovery-password`,
  user: `transcripcion/private/gestion-usuarios`,
  handlingAudioRecording: `transcripcion/private/manejo-estados-audio`,
};
