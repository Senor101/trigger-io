
CREATE OR REPLACE FUNCTION notify_changes()
RETURNS TRIGGER AS $$
DECLARE
  payload JSON;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    payload := row_to_json(OLD);
  ELSE
    payload := row_to_json(NEW);
  END IF;


  PERFORM pg_notify('databse_changes',
    json_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'data', payload
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- CREATE TRIGGER table_change_trigger
-- AFTER INSERT OR UPDATE OR DELETE ON 

DO $$
  DECLARE
    table_rec RECORD;
  BEGIN
    FOR table_rec IN
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public'
    LOOP
      EXECUTE format(
        'CREATE TRIGGER %I_change_trigger
        AFTER INSERT OR UDPATE OR DELETE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION notify_changes()',
        table_rec.tablename, table_rec.tablename
      );
    END LOOP;
  END $$;
