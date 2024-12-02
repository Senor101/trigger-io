

-- Function to notify change 
-- You can call this function whenever you need to notify your server
CREATE OR REPLACE FUNCTION public.notify_changes()
  RETURNS TRIGGER 
  LANGUAGE plpgsql
AS $FUNCTION$
DECLARE
  payload JSON;
BEGIN
  IF (TG_OP = 'DELETE') THEN
    payload := row_to_json(OLD);
  ELSE
    payload := row_to_json(NEW);
  END IF;


  PERFORM pg_notify('new_event',
    json_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'data', payload
    )::text
  );
  RETURN NEW;
END;
$FUNCTION$

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
      RAISE NOTICE 'Processing table: %', table_rec.tablename;
      
      -- Drop trigger if it already exists to avoid conflicts
      EXECUTE format(
        'DROP TRIGGER IF EXISTS notification_trigger ON %I',
        table_rec.tablename
      );

      EXECUTE format(
        'CREATE TRIGGER notification_trigger 
        AFTER INSERT OR UPDATE OR DELETE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION notify_changes()',
        table_rec.tablename
      );
    END LOOP;
  END $$;
